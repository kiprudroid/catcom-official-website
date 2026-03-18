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

// ✅ SCC Leaders API (scc-leaders)
export const fetchSccLeaders = async () => {
  const res = await fetch(`${API_BASE}/scc-leaders`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  await assertOk(res, "Failed to fetch SCC leaders");
  const data = await readJsonIfAny(res);
  return data;
};

export const createSccLeader = async (formData) => {
  const res = await fetch(`${API_BASE}/scc-leaders`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData, // multipart/form-data (browser sets boundary)
  });

  await assertOk(res, "Failed to create SCC leader");
  return readJsonIfAny(res);
};

export const updateSccLeader = async (execId, formData) => {
  if (execId == null)
    throw new Error("execId is required to update SCC leader");

  const res = await fetch(`${API_BASE}/scc-leaders/${execId}`, {
    method: "PUT",
    headers: { Accept: "application/json" },
    body: formData, // multipart/form-data
  });

  await assertOk(res, "Failed to update SCC leader");
  return readJsonIfAny(res);
};

export const deleteSccLeader = async (execId) => {
  if (execId == null)
    throw new Error("execId is required to delete SCC leader");

  // Backend currently expects: /scc-leaders/:scc_name/:id
  // If you update backend to DELETE /scc-leaders/:id, this can remain unchanged.
  const res = await fetch(`${API_BASE}/scc-leaders/${execId}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });

  await assertOk(res, "Failed to delete SCC leader");
  return readJsonIfAny(res);
};
