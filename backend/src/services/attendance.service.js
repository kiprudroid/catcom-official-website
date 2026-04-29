import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as Model from "../models/attendance.model.js";

const VALID_TYPES = ["committee", "scc", "group", "other"];
const VALID_STATUSES = ["present", "absent", "apology"];

// 07x + 7 digits  = 10 total  (Safaricom, Airtel, Telkom 07x)
// 010x + 6 digits = 10 total  (Airtel 010x)
// 011x + 6 digits = 10 total  (Airtel/Telkom 011x)
const KENYAN_PHONE = /^(07[0-9]\d{7}|01[01][0-9]\d{6})$/;

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

export const getAllGroups = async () => {
  const { rows } = await Model.getAllGroupsQuery();
  return rows;
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
  return rows[0] || null;
};

export const getMembersByGroup = async (group_id) => {
  const { rows } = await Model.getMembersByGroupQuery(group_id);
  return rows;
};

export const addMember = async ({ group_id, name, phone, role }) => {
  if (!name?.trim() || !role?.trim())
    throw new Error("name and role are required");
  const cleanPhone = validatePhone(phone);
  const { rows } = await Model.addMemberQuery({
    group_id,
    name: name.trim(),
    phone: cleanPhone,
    role: role.trim(),
  });
  return rows[0];
};

export const updateMember = async ({ id, group_id, name, phone, role }) => {
  const cleanPhone = phone !== undefined ? validatePhone(phone) : undefined;
  const { rows } = await Model.updateMemberQuery({
    id,
    group_id,
    name,
    phone: cleanPhone,
    role,
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

export const markMemberFollowUp = async ({ id, group_id }) => {
  const { rows } = await Model.markFollowUpQuery(id, group_id);
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};
