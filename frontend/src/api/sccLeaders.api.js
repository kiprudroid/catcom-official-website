import { API_BASE } from "./apiClient";

export const fetchEvents = async () => {
  const res = await fetch(`${API_BASE}/scc-leaders`);
  if (!res.ok) throw new Error("Failed to fetch scc leader");
  return res.json();
};
