import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "../services/event.service.js";

export const createEventController = async (req, res) => {
  try {
    const result = await createEventService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllEventsController = async (req, res, next) => {
  try {
    const result = await getAllEventsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getEventByIdController = async (req, res, next) => {
  try {
    const result = await getEventByIdService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (req, res, next) => {
  try {
    const result = await updateEventService(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteEventController = async (req, res, next) => {
  try {
    await deleteEventService(req.params.id);
    return res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};
