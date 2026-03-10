import { createEvent, findAllEvents } from "../models/event.model.js";

export const createEventService = async (data) => {
  if (
    !data ||
    !data.title ||
    !data.event_date ||
    !data.event_time ||
    !data.venue
  ) {
    throw new Error(
      "All fields are required: title, event_date, event_time, venue",
    );
  }
  return await createEvent(data);
};

/**
 * Business logic for fetching all events
 */
export const getAllEvents = async () => {
  return await findAllEvents();
};
