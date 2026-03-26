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

// ✅ Fetch all join groups (used by admin panel)
export const fetchJoinGroups = async () => {
  const res = await fetch(`${API_BASE}/join-group`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  await assertOk(res, "Failed to fetch join groups");
  return readJsonIfAny(res);
};

// ✅ Create join group — maps frontend fields to backend field names
export const createJoinGroup = async (joinGroupData) => {
  const { fname, lname, phone, email, gender, college, groups } = joinGroupData;

  const payload = {
    full_name: `${fname} ${lname}`.trim(), // backend expects one full_name string
    phone_number: phone, // backend expects phone_number
    email,
    gender,
    college,
    group_joined: groups.join(", "), // backend expects a string, not array
  };

  const res = await fetch(`${API_BASE}/join-group`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  await assertOk(res, "Failed to submit join group request");
  return readJsonIfAny(res);
};

// ✅ Delete join group by ID (used by admin panel)
export const deleteJoinGroup = async (id) => {
  if (id == null) throw new Error("id is required to delete join group");

  const res = await fetch(`${API_BASE}/join-group/${id}`, {
    method: "DELETE",
  });

  await assertOk(res, "Failed to delete join group");
  return null;
};
