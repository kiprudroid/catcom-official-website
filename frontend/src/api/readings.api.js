import { API_BASE } from "./apiClient";

export const fetchReadings = async () => {
  const res = await fetch(`${API_BASE}/readings`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};