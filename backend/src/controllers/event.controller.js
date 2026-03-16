import {
  createEventService,
  getAllEventsService,
} from "../services/event.service.js";

export const createEventController = async (req, res) => {
  try {
    const result = await createEventService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllEventsController = async (req, res) => {
  try {
    const result = await getAllEventsService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
