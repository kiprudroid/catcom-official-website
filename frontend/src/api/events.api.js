import { API_BASE } from "./apiClient";

// Fetch all events
export const fetchEvents = async () => {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

// Fetch a single event by ID
export const fetchEventById = async (id) => {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

// Create a new event
export const createEvent = async (eventData) => {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
};

// Delete an event
export const deleteEvent = async (id) => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
};
