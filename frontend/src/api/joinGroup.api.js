import { API_BASE } from "./apiClient";
import { fetchMembers } from "./attendance.api";

const assertOk = async (res, message) => {
  if (res.ok) return;
  let details = "";
  try {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await res.json();
      details = json?.message ? `: ${json.message}` : "";
    } else {
      const text = await res.text();
      details = text ? `: ${text}` : "";
    }
  } catch {
    // ignore parse errors
  }
  throw new Error(`${message} (${res.status})${details}`);
};

const readJsonIfAny = async (res) => {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  return res.json();
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

export const fetchJoinGroups = async () => {
  const res = await fetch(`${API_BASE}/join-group`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  await assertOk(res, "Failed to fetch join groups");
  return readJsonIfAny(res);
};

export const createJoinGroup = async (joinGroupData) => {
  const { fname, lname, phone, email, gender, college, groups } = joinGroupData;

  // Phone-number uniqueness guard — runs before touching the join-group endpoint
  await assertPhoneNotRegistered(phone);

  const payload = {
    full_name: `${fname} ${lname}`.trim(),
    phone_number: phone,
    email,
    gender,
    college,
    group_joined: Array.isArray(groups) ? groups.join(", ") : groups,
  };

  const res = await fetch(`${API_BASE}/join-group`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  await assertOk(res, "Failed to submit join group request");
  return readJsonIfAny(res);
};

export const assignJoinGroup = async (id, group_joined) => {
  if (!id || !group_joined)
    throw new Error("id and group are required to assign join group request");

  const res = await fetch(`${API_BASE}/join-group/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ group_joined }),
  });

  await assertOk(res, "Failed to assign join group request");
  return readJsonIfAny(res);
};

export const deleteJoinGroup = async (id) => {
  if (id == null) throw new Error("id is required to delete join group");

  const res = await fetch(`${API_BASE}/join-group/${id}`, {
    method: "DELETE",
  });

  await assertOk(res, "Failed to delete join group");
  return null;
};
