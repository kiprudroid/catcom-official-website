import * as EventModel from "../models/event.model.js";

export const createEventService = async (data) => {
  if (!data.event_date || !data.activity) {
    throw new Error("Missing required fields");
  }

  return await EventModel.createEvent(data);
};

export const getEventsService = async () => {
  return await EventModel.getAllEvents();
};
