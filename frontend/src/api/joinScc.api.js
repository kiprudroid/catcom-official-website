import { API_BASE } from "./apiClient";
const API_URL = `${API_BASE}/join-sccs`;

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };
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