import { API_BASE } from "./apiClient";
import { fetchMembers } from "./attendance.api";

const API_URL = `${API_BASE}/join-sccs`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Block submission if the phone number already exists in attendance_members.
 * Phone numbers are unique per person — someone can belong to a group AND
 * an SCC, but they cannot have two different phone numbers.
 *
 * If fetchMembers() fails (network/auth issue), we fail open so the forms
 * stay usable during attendance API downtime.
 */
const assertPhoneNotRegistered = async (phoneNumber) => {
  const normPhone = (phoneNumber || "").replace(/\s/g, "").trim();
  if (!normPhone) return;

  let members = [];
  try {
    members = await fetchMembers();
  } catch {
    return; // fail open
  }

  const duplicate = members.find(
    (m) => (m.phone || "").replace(/\s/g, "").trim() === normPhone,
  );

  if (duplicate) {
    throw new Error("ALREADY_MEMBER");
  }
};

export const fetchJoinSccs = async () => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch SCC join requests: ${text}`);
  }
  return res.json();
};

export const createJoinScc = async (payload) => {
  await assertPhoneNotRegistered(payload.phone_number);

  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to submit join request: ${text}`);
  }
  return res.json();
};

export const deleteJoinScc = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete join request: ${text}`);
  }
};

export const assignScc = async (id, scc_name) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ scc_name }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to assign SCC: ${text}`);
  }
  return res.json();
};
