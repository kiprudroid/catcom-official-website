import { API_BASE } from "./apiClient";


export const fetchLeaders = async () => {
  const res = await fetch(`${API_BASE}/leaders`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  await assertOk(res, "Failed to fetch leaders");
  const data = await readJsonIfAny(res);

  return Array.isArray(data) ? data : [];
};


 
export const createLeader = async (formData) => {
  const res = await fetch(`${API_BASE}/leaders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  await assertOk(res, "Failed to create leader");
  return readJsonIfAny(res);
};


export const updateLeader = async (leaderId, formData) => {
  if (leaderId == null)
    throw new Error("leaderId is required to update leader");

  const res = await fetch(`${API_BASE}/leaders/${leaderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  await assertOk(res, "Failed to update leader");
  return readJsonIfAny(res);
};

export const deleteLeader = async (leaderId) => {
  if (leaderId == null)
    throw new Error("leaderId is required to delete leader");

  const res = await fetch(`${API_BASE}/leaders/${leaderId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  await assertOk(res, "Failed to delete leader");
  return readJsonIfAny(res);
};

//helper function
const readErrorBody = async (res) => {
  try {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await res.json();
      return (
        data?.message ||
        data?.error ||
        data?.detail ||
        JSON.stringify(data, null, 2)
      );
    }
    const text = await res.text();
    return text || null;
  } catch {
    return null;
  }
};

const assertOk = async (res, fallbackMessage) => {
  if (res.ok) return;

  const details = await readErrorBody(res);
  const message = details
    ? `${fallbackMessage} (${res.status}): ${details}`
    : `${fallbackMessage} (${res.status})`;

  throw new Error(message);
};


const readJsonIfAny = async (res) => {
  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return res.json();
};