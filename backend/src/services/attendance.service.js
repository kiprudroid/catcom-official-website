import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as Model from "../models/attendance.model.js";
import * as LoginModel from "../models/group-admin-login.model.js";

const VALID_TYPES = ["committee", "scc", "group", "other"];
const VALID_STATUSES = ["present", "absent", "apology"];
const KENYAN_PHONE = /^(07[0-9]\d{7}|01[01][0-9]\d{6})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

const validatePhone = (phone) => {
  if (phone === null || phone === undefined || phone === "") return null;
  const digits = String(phone).replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return null;
  if (!KENYAN_PHONE.test(digits))
    throw new Error(
      "Enter a valid Kenyan number (e.g. 07XXXXXXXX or 011XXXXXXX)",
    );
  return digits;
};

const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + diffToMonday);
  return d;
};

const loggedInOn = (logins, targetDay) =>
  logins.some((l) => new Date(l.logged_in_at).getDay() === targetDay);

const computeWeeklyStatus = (logins) => {
  const today = new Date().getDay();
  const weekStart = startOfWeek(new Date());
  const hitThursday = loggedInOn(logins, 4);
  const hitSunday = loggedInOn(logins, 0);

  let weekly_status = "compliant";
  if (!hitThursday && today > 4) weekly_status = "missed_thursday";
  else if (
    hitThursday &&
    !hitSunday &&
    new Date() > new Date(weekStart.getTime() + 6 * DAY_MS)
  )
    weekly_status = "missed_sunday";
  else if (!hitThursday && today <= 4) weekly_status = "pending_thursday";
  else if (hitThursday && !hitSunday) weekly_status = "pending_sunday";

  return {
    last_login_at: logins[0]?.logged_in_at || null,
    weekly_status,
  };
};

const getWeeklyLoginStatus = async (group_admin_id) => {
  const weekStart = startOfWeek(new Date());
  const { rows: logins } = await LoginModel.getRecentLoginsQuery(
    group_admin_id,
    weekStart,
  );
  return computeWeeklyStatus(logins);
};

export const getAllGroups = async () => {
  const { rows: groups } = await Model.getAllGroupsQuery();
  const { rows: admins } = await LoginModel.getAllAdminsQuery();
  const weekStart = startOfWeek(new Date());
  const { rows: allLogins } =
    await LoginModel.getAllRecentLoginsQuery(weekStart);

  const loginsByAdmin = {};
  for (const l of allLogins) {
    if (!loginsByAdmin[l.group_admin_id]) loginsByAdmin[l.group_admin_id] = [];
    loginsByAdmin[l.group_admin_id].push(l);
  }

  const statusByGroupId = {};
  for (const admin of admins) {
    statusByGroupId[admin.group_id] = computeWeeklyStatus(
      loginsByAdmin[admin.id] || [],
    );
  }

  return groups.map((g) => ({
    ...g,
    last_login_at: statusByGroupId[g.id]?.last_login_at || null,
    weekly_status: statusByGroupId[g.id]?.weekly_status || null,
  }));
};

export const getGroupById = async (id) => {
  const { rows } = await Model.getGroupByIdQuery(id);
  if (!rows[0]) throw new Error("Group not found");
  return rows[0];
};

export const createGroup = async ({ name, type }) => {
  if (!name?.trim()) throw new Error("Group name is required");
  if (!VALID_TYPES.includes(type))
    throw new Error(`type must be one of: ${VALID_TYPES.join(", ")}`);
  const { rows } = await Model.createGroupQuery({ name: name.trim(), type });
  return rows[0];
};

export const updateGroup = async ({ id, name, type }) => {
  if (!name?.trim()) throw new Error("Group name is required");
  if (!VALID_TYPES.includes(type))
    throw new Error(`type must be one of: ${VALID_TYPES.join(", ")}`);
  const { rows } = await Model.updateGroupQuery({
    id,
    name: name.trim(),
    type,
  });
  if (!rows[0]) throw new Error("Group not found");
  return rows[0];
};

export const deleteGroup = async (id) => {
  const { rows } = await Model.deleteGroupQuery(id);
  if (!rows[0]) throw new Error("Group not found");
  return rows[0];
};

export const loginGroupAdmin = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password required");
  const { rows } = await Model.getAdminByEmailQuery(email.trim().toLowerCase());
  const admin = rows[0];
  if (!admin) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new Error("Invalid credentials");

  try {
    await LoginModel.recordAdminLoginQuery(admin.id);
  } catch (err) {
    console.error("Failed to record group admin login:", err.message);
  }

  const token = jwt.sign(
    {
      admin_id: admin.id,
      group_id: admin.group_id,
      group_name: admin.group_name,
      group_type: admin.group_type,
      email: admin.email,
      role: "group-admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );
  return {
    token,
    group_id: admin.group_id,
    group_name: admin.group_name,
    group_type: admin.group_type,
  };
};

export const createGroupAdmin = async ({ group_id, email, password }) => {
  if (!group_id || !email || !password)
    throw new Error("group_id, email, and password are required");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await Model.createAdminQuery({
    group_id,
    email: email.trim().toLowerCase(),
    hashedPassword,
  });
  return rows[0];
};

export const updateGroupAdminPassword = async ({ group_id, password }) => {
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");
  const { rows: admins } = await Model.getAdminByGroupIdQuery(group_id);
  if (!admins[0]) throw new Error("Admin not found for this group");
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await Model.updateAdminPasswordQuery({
    id: admins[0].id,
    hashedPassword,
  });
  return rows[0];
};

export const deleteGroupAdmin = async (group_id) => {
  const { rows } = await Model.deleteAdminQuery(group_id);
  return rows[0];
};

export const getGroupAdmin = async (group_id) => {
  const { rows } = await Model.getAdminByGroupIdQuery(group_id);
  const admin = rows[0];
  if (!admin) return null;
  const { last_login_at, weekly_status } = await getWeeklyLoginStatus(admin.id);
  return { ...admin, last_login_at, weekly_status };
};

export const getMembersByGroup = async (group_id) => {
  const { rows } = await Model.getMembersByGroupQuery(group_id);
  return rows;
};

export const addMember = async ({
  group_id,
  name,
  phone,
  role,
  family_name,
}) => {
  if (!name?.trim() || !role?.trim())
    throw new Error("name and role are required");
  const cleanPhone = validatePhone(phone);
  const { rows } = await Model.addMemberQuery({
    group_id,
    name: name.trim(),
    phone: cleanPhone,
    role: role.trim(),
    family_name: family_name?.trim() || null,
  });
  return rows[0];
};

export const updateMember = async ({
  id,
  group_id,
  name,
  phone,
  role,
  family_name,
  in_session,
}) => {
  const cleanPhone = phone !== undefined ? validatePhone(phone) : undefined;
  const { rows } = await Model.updateMemberQuery({
    id,
    group_id,
    name,
    phone: cleanPhone,
    role,
    family_name:
      family_name !== undefined ? family_name?.trim() || null : undefined,
    in_session,
  });
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

export const removeMember = async ({ id, group_id }) => {
  const { rows } = await Model.removeMemberQuery({ id, group_id });
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

export const getAttendanceByDate = async ({ group_id, date }) => {
  if (!date) throw new Error("date is required");
  const { rows } = await Model.getAttendanceByDateQuery({ group_id, date });
  return rows;
};

export const markAttendance = async ({
  member_id,
  date,
  status = "absent",
  group_id,
}) => {
  if (!member_id || !date) throw new Error("member_id and date are required");
  if (!VALID_STATUSES.includes(status))
    throw new Error("status must be present, absent, or apology");
  const { rows } = await Model.upsertAttendanceQuery({
    member_id,
    date,
    status,
  });
  return rows[0];
};

export const markMemberFollowUp = async ({ id, group_id, meetingDate }) => {
  if (!meetingDate) throw new Error("meetingDate is required");
  const { rows } = await Model.markFollowUpQuery(id, group_id, meetingDate);
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

export const getAttendanceByRange = async ({
  group_id,
  startDate,
  endDate,
}) => {
  if (!startDate || !endDate)
    throw new Error("startDate and endDate are required");
  if (startDate > endDate) throw new Error("startDate must be before endDate");
  const { rows } = await Model.getAttendanceByRangeQuery(
    group_id,
    startDate,
    endDate,
  );
  return rows;
};

export const getMeetingPurpose = async ({ group_id, date }) => {
  if (!date) throw new Error("date is required");
  const { rows } = await Model.getMeetingByDateQuery({ group_id, date });
  return rows[0] || null;
};

export const upsertMeetingPurpose = async ({
  group_id,
  date,
  purpose,
  activities,
}) => {
  if (!date) throw new Error("date is required");
  if (!purpose?.trim()) throw new Error("purpose is required");
  const { rows } = await Model.upsertMeetingQuery({
    group_id,
    date,
    purpose,
    activities,
  });
  return rows[0];
};

export const getVisitorsByDate = async ({ group_id, date }) => {
  if (!date) throw new Error("date is required");
  const { rows } = await Model.getVisitorsByDateQuery({ group_id, date });
  return rows;
};

export const addVisitor = async ({ group_id, date, name, phone, type }) => {
  if (!name?.trim()) throw new Error("name is required");
  if (!date) throw new Error("date is required");
  const cleanPhone = phone ? validatePhone(phone) : null;
  const { rows } = await Model.addVisitorQuery({
    group_id,
    date,
    name: name.trim(),
    phone: cleanPhone,
    type: type || "visitor",
  });
  return rows[0];
};

export const removeVisitor = async ({ id, group_id }) => {
  const { rows } = await Model.deleteVisitorQuery({ id, group_id });
  if (!rows[0]) throw new Error("Visitor not found");
  return rows[0];
};
