import { API_BASE } from "./apiClient";

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

  const payload = {
    full_name: `${fname} ${lname}`.trim(), // backend expects one full_name string
    phone_number: phone,
    email,
    gender,
    college,
    group_joined: Array.isArray(groups) ? groups.join(", ") : groups, // handles both string (radio) and array (checkbox)
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
