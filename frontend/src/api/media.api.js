import { API_BASE } from "./apiClient";

const adminHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Public ────────────────────────────────────────────────────────
export const fetchPublicMedia = async ({ type, search } = {}) => {
  const params = new URLSearchParams();
  if (type && type !== "all") params.set("type", type);
  if (search) params.set("search", search);
  const res = await fetch(`${API_BASE}/media?${params}`);
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
};

// ── Admin ─────────────────────────────────────────────────────────
export const fetchAdminMedia = async ({ type, search } = {}) => {
  const params = new URLSearchParams();
  if (type && type !== "all") params.set("type", type);
  if (search) params.set("search", search);
  const res = await fetch(`${API_BASE}/media/admin?${params}`, {
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
};

export const createMediaItem = async (data) => {
  const res = await fetch(`${API_BASE}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create media item");
  return res.json();
};

export const updateMediaItem = async (id, data) => {
  const res = await fetch(`${API_BASE}/media/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update media item");
  return res.json();
};

export const deleteMediaItem = async (id) => {
  const res = await fetch(`${API_BASE}/media/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete media item");
  return res.json();
};

export const toggleMediaPublished = async (id) => {
  const res = await fetch(`${API_BASE}/media/${id}/publish`, {
    method: "PATCH",
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to toggle published");
  return res.json();
};
