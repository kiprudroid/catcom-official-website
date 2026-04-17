import { API_BASE } from "./apiClient";

// ── Helper: resolve a server-relative path to a full URL ────────
// thumbnail is stored as "/uploads/posters/xxx.jpg" (relative to Express).
// The React dev server is on a different port, so we must prefix with
// the API origin (everything before /api).
export const getImageUrl = (relativePath) => {
  if (!relativePath) return null;
  // If it's already absolute (e.g. an external http URL) leave it alone
  if (relativePath.startsWith("http")) return relativePath;
  // API_BASE is something like "http://localhost:3000/api"
  // Strip the "/api" suffix to get the origin
  const origin = API_BASE.replace(/\/api\/?$/, "");
  return `${origin}${relativePath}`;
};

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
  const isFormData = data instanceof FormData;
  const res = await fetch(`${API_BASE}/media`, {
    method: "POST",
    headers: isFormData
      ? adminHeaders()
      : { "Content-Type": "application/json", ...adminHeaders() },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create media item");
  return res.json();
};

export const updateMediaItem = async (id, data) => {
  const isFormData = data instanceof FormData;
  const res = await fetch(`${API_BASE}/media/${id}`, {
    method: "PUT",
    headers: isFormData
      ? adminHeaders()
      : { "Content-Type": "application/json", ...adminHeaders() },
    body: isFormData ? data : JSON.stringify(data),
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
