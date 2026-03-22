import { API_BASE } from "./apiClient";


export const fetchJoinSccs = async () => {
  const res = await fetch(`http://localhost:5000/api/join-sccs`, {
    method: "GET",
   headers: { "Accept": "application/json" }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch SCC join requests: ${text}`);
  }
  return res.json();
};

export const createJoinScc = async (payload) => {
  const res = await fetch(`http://localhost:5000/api/join-sccs`, {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to submit join request: ${text}`);
    console.error(`Failed to submit join request: ${text}`);    
  }

  return res.json();
};

export const deleteJoinScc = async (id) => {
  const res = await fetch(`http://localhost:5000/api/join-sccs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete join request: ${text}`);
  }
};