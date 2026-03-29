import { API_BASE } from "./apiClient";

const authHeaders = () => {
  const token = localStorage.getItem("attendance_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const adminHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Public ────────────────────────────────────────────────────────

export const fetchAttendanceGroups = async () => {
  const res = await fetch(`${API_BASE}/attendance/groups`);
  if (!res.ok) throw new Error("Failed to fetch groups");
  return res.json();
};

export const loginAttendanceAdmin = async ({ email, password }) => {
  const res = await fetch(`${API_BASE}/attendance/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Login failed");
  }
  return res.json();
};

// ── Super admin: group management ─────────────────────────────────

export const createGroup = async (data) => {
  const res = await fetch(`${API_BASE}/attendance/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create group");
  return res.json();
};

export const updateGroup = async (id, data) => {
  const res = await fetch(`${API_BASE}/attendance/groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update group");
  return res.json();
};

export const deleteGroup = async (id) => {
  const res = await fetch(`${API_BASE}/attendance/groups/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete group");
  return res.json();
};

// ── Super admin: group admin account management ───────────────────

export const fetchGroupAdmin = async (group_id) => {
  const res = await fetch(`${API_BASE}/attendance/groups/${group_id}/admin`, {
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch admin");
  return res.json();
};

export const createGroupAdmin = async (group_id, data) => {
  const res = await fetch(`${API_BASE}/attendance/groups/${group_id}/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create admin account");
  return res.json();
};

export const updateGroupAdminPassword = async (group_id, password) => {
  const res = await fetch(`${API_BASE}/attendance/groups/${group_id}/admin`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("Failed to update password");
  return res.json();
};

export const deleteGroupAdmin = async (group_id) => {
  const res = await fetch(`${API_BASE}/attendance/groups/${group_id}/admin`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete admin account");
  return res.json();
};

// ── Group admin: members ──────────────────────────────────────────

export const fetchMembers = async () => {
  const res = await fetch(`${API_BASE}/attendance/members`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch members");
  return res.json();
};

export const createMember = async (data) => {
  const res = await fetch(`${API_BASE}/attendance/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create member");
  return res.json();
};

export const deleteMember = async (id) => {
  const res = await fetch(`${API_BASE}/attendance/members/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove member");
  return res.json();
};

// ── Group admin: attendance ───────────────────────────────────────

export const fetchAttendanceByDate = async (date) => {
  const res = await fetch(`${API_BASE}/attendance/records/${date}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch attendance");
  return res.json();
};

export const markAttendance = async (data) => {
  const res = await fetch(`${API_BASE}/attendance/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to mark attendance");
  return res.json();
};

