import { createEvent, findAllEvents } from "../models/event.model.js";

/**
 * Business logic for creating an event
 */
export const createEventService = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  const { title, event_date, event_time, venue } = data;

  if (!title || !event_date || !event_time || !venue) {
    throw new Error("All fields are required: title, date, time, venue");
  }

  return await createEvent({
    title,
    event_date,
    event_time,
    venue,
  });
};

/**
 * Business logic for fetching all events
 */
export const getAllEventsService = async () => {
  return await findAllEvents();
};
