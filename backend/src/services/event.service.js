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

export const getAllEventsService = async () => {
  return await findAllEvents();
};
