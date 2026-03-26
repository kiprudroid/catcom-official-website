import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as Model from "../models/attendance.model.js";

const VALID_TYPES = ["committee", "scc", "pastoral", "other"];
const VALID_STATUSES = ["present", "absent", "apology"];

// ── Groups ────────────────────────────────────────────────────────

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

// ── Group Admin Auth ──────────────────────────────────────────────

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

// ── Group Admin Management (called by super admin) ────────────────

export const createGroupAdmin = async ({ group_id, email, password }) => {
  if (!group_id || !email || !password) {
    throw new Error("group_id, email, and password are required");
  }
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

// ── Members ───────────────────────────────────────────────────────

export const getMembersByGroup = async (group_id) => {
  const { rows } = await Model.getMembersByGroupQuery(group_id);
  return rows;
};

export const addMember = async ({ group_id, name, role }) => {
  if (!name?.trim() || !role?.trim())
    throw new Error("name and role are required");
  const { rows } = await Model.addMemberQuery({
    group_id,
    name: name.trim(),
    role: role.trim(),
  });
  return rows[0];
};

export const updateMember = async ({ id, group_id, name, role }) => {
  const { rows } = await Model.updateMemberQuery({ id, group_id, name, role });
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

export const removeMember = async ({ id, group_id }) => {
  const { rows } = await Model.removeMemberQuery({ id, group_id });
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

// ── Attendance ────────────────────────────────────────────────────

export const getAttendanceByDate = async ({ group_id, date }) => {
  if (!date) throw new Error("date is required");
  const { rows } = await Model.getAttendanceByDateQuery({ group_id, date });
  return rows;
};

export const markAttendance = async ({ member_id, date, status, group_id }) => {
  if (!member_id || !date || !status) {
    throw new Error("member_id, date, and status are required");
  }
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("status must be present, absent, or apology");
  }
  const { rows } = await Model.upsertAttendanceQuery({
    member_id,
    date,
    status,
  });
  return rows[0];
};
