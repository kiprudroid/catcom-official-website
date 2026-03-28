import {
  createEventModel,
  findAllEventsModel,
  findEventByIdModel,
  updateEventModel,
  deleteEventModel,
} from "../models/event.model.js";

const VALID_CATEGORIES = ["Activity", "Mass Animation"];

export const createEventService = async (data) => {
  if (
    !data ||
    !data.title ||
    !data.event_date ||
    !data.event_time ||
    !data.venue ||
    !data.category
  ) {
    throw new Error(
      "All fields are required: title, event_date, event_time, venue, category",
    );
  }
  if (!VALID_CATEGORIES.includes(data.category)) {
    throw new Error("Category must be 'Activity' or 'Mass Animation'");
  }
  return await createEventModel(data);
};

export const getAllEventsService = async () => {
  return await findAllEventsModel();
};

export const getEventByIdService = async (id) => {
  const event = await findEventByIdModel(id);
  if (!event) throw new Error("Event not found");
  return event;
};

export const updateEventService = async (id, data) => {
  if (data.category && !VALID_CATEGORIES.includes(data.category)) {
    throw new Error("Category must be 'Activity' or 'Mass Animation'");
  }
  const updated = await updateEventModel(id, data);
  if (!updated) throw new Error("Event not found");
  return updated;
};

export const deleteEventService = async (id) => {
  const deleted = await deleteEventModel(id);
  if (!deleted) throw new Error("Event not found");
  return true;
};
