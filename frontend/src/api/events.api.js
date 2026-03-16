import { API_BASE } from "./apiClient";

export const fetchEvents = async () => {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

