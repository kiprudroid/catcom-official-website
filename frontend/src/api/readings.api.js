import { API_BASE } from "./apiClient";

export const fetchReadings = async () => {
  const res = await fetch(`${API_BASE}/readings`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch readings");
  }
  return res.json();
};

export const fetchReadingsByDate = async (date) => {
  const res = await fetch(`${API_BASE}/readings/${date}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `No readings found for ${date}`);
  }
  return res.json();
};
