import * as PastoralModel from "../models/pastoral.model.js";

// ── Members ───────────────────────────────────────────────────────

export const getAllMembers = async () => {
  const { rows } = await PastoralModel.getAllMembersQuery();
  return rows;
};

export const getMemberById = async (id) => {
  const { rows } = await PastoralModel.getMemberByIdQuery(id);
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

export const addMember = async ({ name, role }) => {
  if (!name?.trim() || !role?.trim()) {
    throw new Error("name and role are required");
  }
  const { rows } = await PastoralModel.addMemberQuery({
    name: name.trim(),
    role: role.trim(),
  });
  return rows[0];
};

export const updateMember = async (id, updates) => {
  const { rows } = await PastoralModel.updateMemberQuery({ id, ...updates });
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

export const removeMember = async (id) => {
  const { rows } = await PastoralModel.removeMemberQuery(id);
  if (!rows[0]) throw new Error("Member not found");
  return rows[0];
};

// ── Attendance ────────────────────────────────────────────────────

export const getAttendanceByDate = async (date) => {
  if (!date) throw new Error("date is required");
  const { rows } = await PastoralModel.getAttendanceByDateQuery(date);
  return rows;
};

export const markAttendance = async ({ member_id, date, status }) => {
  if (!member_id || !date || !status) {
    throw new Error("member_id, date, and status are required");
  }
  const VALID_STATUSES = ["present", "absent", "apology"];
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("status must be present, absent, or apology");
  }
  const { rows } = await PastoralModel.markAttendanceQuery({
    member_id,
    date,
    status,
  });
  return rows[0];
};
