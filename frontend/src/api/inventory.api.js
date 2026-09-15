import { API_BASE } from "./apiClient";

const inventoryHeaders = () => {
  const token = localStorage.getItem("inventory_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const adminHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchWithRetry = async (url, opts, retries = 1) => {
  const res = await fetch(url, opts);
  if (res.status === 503 && retries > 0) {
    await new Promise((r) => setTimeout(r, 1200));
    return fetchWithRetry(url, opts, retries - 1);
  }
  return res;
};

// ── Groups (public for login picker) ──
export const fetchInventoryGroups = async () => {
  const res = await fetchWithRetry(`${API_BASE}/inventory/groups`);
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to fetch inventory groups");
  }
  return res.json();
};

export const createInventoryGroup = async (data) => {
  const res = await fetch(`${API_BASE}/inventory/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to create inventory group");
  }
  return res.json();
};

export const updateInventoryGroup = async (id, data) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to update inventory group");
  }
  return res.json();
};

export const deleteInventoryGroup = async (id) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to delete inventory group");
  }
  return res.json();
};

// ── Auth ──
export const loginInventoryAdmin = async ({ email, password }) => {
  const res = await fetch(`${API_BASE}/inventory/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Login failed");
  }
  return res.json();
};

// ── Superadmin: admin per group ──
export const fetchInventoryGroupAdmin = async (group_id) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/admin`, { headers: adminHeaders() });
  if (!res.ok) throw new Error("Failed to fetch inventory admin");
  return res.json();
};

export const createInventoryGroupAdmin = async (group_id, data) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to create inventory admin");
  }
  return res.json();
};

export const updateInventoryGroupAdminPassword = async (group_id, password) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/admin`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to update password");
  }
  return res.json();
};

export const deleteInventoryGroupAdmin = async (group_id) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/admin`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete inventory admin");
  return res.json();
};

export const fetchAllInventoryAdmins = async () => {
  const res = await fetch(`${API_BASE}/inventory/admin/list`, { headers: adminHeaders() });
  if (!res.ok) throw new Error("Failed to fetch inventory admins");
  return res.json();
};

export const grantInventoryAdminGroup = async (admin_id, group_id) => {
  const res = await fetch(`${API_BASE}/inventory/admins/${admin_id}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify({ group_id }),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to grant group");
  }
  return res.json();
};

export const revokeInventoryAdminGroup = async (admin_id, group_id) => {
  const res = await fetch(`${API_BASE}/inventory/admins/${admin_id}/groups/${group_id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error("Failed to revoke group");
  return res.json();
};

export const deleteInventoryAdminById = async (admin_id) => {
  const res = await fetch(`${API_BASE}/inventory/admins/${admin_id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to delete admin");
  }
  return res.json();
};

// ── Items (inventory-admin) ──
export const fetchInventoryItems = async (group_id, params = {}) => {
  const sp = new URLSearchParams(params).toString();
  const qs = sp ? `?${sp}` : "";
  const res = await fetchWithRetry(`${API_BASE}/inventory/groups/${group_id}/items${qs}`, { headers: inventoryHeaders() });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to fetch items");
  }
  return res.json();
};

export const createInventoryItem = async (group_id, data) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...inventoryHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to create item");
  }
  return res.json();
};

export const updateInventoryItem = async (id, data) => {
  const res = await fetch(`${API_BASE}/inventory/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...inventoryHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to update item");
  }
  return res.json();
};

export const adjustInventoryItem = async (id, payload) => {
  const res = await fetch(`${API_BASE}/inventory/items/${id}/adjust`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...inventoryHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to adjust quantity");
  }
  return res.json();
};

export const archiveInventoryItem = async (id) => {
  const res = await fetch(`${API_BASE}/inventory/items/${id}`, {
    method: "DELETE",
    headers: inventoryHeaders(),
  });
  if (!res.ok) throw new Error("Failed to archive item");
  return res.json();
};

export const fetchItemTransactions = async (id) => {
  const res = await fetch(`${API_BASE}/inventory/items/${id}/transactions`, { headers: inventoryHeaders() });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const fetchGroupTransactions = async (group_id) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/transactions`, { headers: inventoryHeaders() });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const fetchInventoryStats = async (group_id) => {
  const res = await fetchWithRetry(`${API_BASE}/inventory/groups/${group_id}/stats`, { headers: inventoryHeaders() });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to fetch stats");
  }
  return res.json();
};

// ── Bookings ──
export const fetchBookings = async (group_id, params = {}) => {
  const sp = new URLSearchParams(params).toString();
  const qs = sp ? `?${sp}` : "";
  const res = await fetchWithRetry(`${API_BASE}/inventory/groups/${group_id}/bookings${qs}`, { headers: inventoryHeaders() });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to fetch bookings");
  }
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(`${API_BASE}/inventory/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...inventoryHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to create booking");
  }
  return res.json();
};

export const updateBookingStatus = async (id, payload) => {
  const res = await fetch(`${API_BASE}/inventory/bookings/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...inventoryHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to update booking status");
  }
  return res.json();
};

export const updateBookingPayment = async (id, payload) => {
  const res = await fetch(`${API_BASE}/inventory/bookings/${id}/payment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...inventoryHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update payment");
  return res.json();
};

export const deleteBooking = async (id) => {
  const res = await fetch(`${API_BASE}/inventory/bookings/${id}`, { method: "DELETE", headers: inventoryHeaders() });
  if (!res.ok) throw new Error("Failed to delete booking");
  return res.json();
};

export const fetchBookingRange = async (group_id, start, end) => {
  const res = await fetch(`${API_BASE}/inventory/bookings/range?group_id=${group_id}&start=${start}&end=${end}`, { headers: inventoryHeaders() });
  if (!res.ok) throw new Error("Failed to fetch range");
  return res.json();
};

// ── Regimes/windows (superadmin) ──
export const fetchRegimes = async () => {
  const res = await fetch(`${API_BASE}/inventory/regimes`, { headers: adminHeaders() });
  if (!res.ok) throw new Error("Failed to fetch regimes");
  return res.json();
};

export const createRegime = async (data) => {
  const res = await fetch(`${API_BASE}/inventory/regimes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.message||"Failed"); }
  return res.json();
};

export const updateRegime = async (id, data) => {
  const res = await fetch(`${API_BASE}/inventory/regimes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update regime");
  return res.json();
};

export const deleteRegime = async (id) => {
  const res = await fetch(`${API_BASE}/inventory/regimes/${id}`, { method: "DELETE", headers: adminHeaders() });
  if (!res.ok) throw new Error("Failed to delete regime");
  return res.json();
};

export const fetchEditWindow = async (group_id) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/window`, { headers: adminHeaders() });
  if (!res.ok) return { is_open: true };
  return res.json();
};

export const upsertEditWindow = async (group_id, data) => {
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/window`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.message||"Failed"); }
  return res.json();
};

export const fetchInventoryWindowPublic = async (group_id) => {
  const token = localStorage.getItem("inventory_token");
  const hdr = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${API_BASE}/inventory/groups/${group_id}/window`, { headers: hdr });
  if (!res.ok) return { is_open: true };
  return res.json();
};

// ── Superadmin: read items/bookings via admin token (mirrors /admin/groups/:id/…) ──
export const fetchAdminInventoryItems = async (group_id) => {
  const res = await fetch(`${API_BASE}/inventory/admin/groups/${group_id}/items`, { headers: adminHeaders() });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to fetch items");
  }
  return res.json();
};

export const fetchAdminBookings = async (group_id) => {
  const res = await fetch(`${API_BASE}/inventory/admin/groups/${group_id}/bookings`, { headers: adminHeaders() });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to fetch bookings");
  }
  return res.json();
};
