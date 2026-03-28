import { API_BASE } from "./apiClient";

// ── Members ───────────────────────────────────────────────────────

export const fetchPastoralMembers = async () => {
  const res = await fetch(`${API_BASE}/pastoral/members`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch members");
  return res.json();
};

export const createPastoralMember = async ({ name, role }) => {
  const res = await fetch(`${API_BASE}/pastoral/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name, role }),
  });
  if (!res.ok) throw new Error("Failed to create member");
  return res.json();
};

export const updatePastoralMember = async (id, data) => {
  const res = await fetch(`${API_BASE}/pastoral/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update member");
  return res.json();
};

export const removePastoralMember = async (id) => {
  const res = await fetch(`${API_BASE}/pastoral/members/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove member");
  return res.json();
};

// ── Attendance ────────────────────────────────────────────────────

export const fetchAttendanceByDate = async (date) => {
  const res = await fetch(`${API_BASE}/pastoral/attendance/${date}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch attendance");
  return res.json();
};

export const markAttendance = async ({ member_id, date, status }) => {
  const res = await fetch(`${API_BASE}/pastoral/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ member_id, date, status }),
  });
  if (!res.ok) throw new Error("Failed to mark attendance");
  return res.json();
};

// ── Auth helper ───────────────────────────────────────────────────
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
