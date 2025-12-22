import * as EventService from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const event = await EventService.createEventService(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await EventService.getEventsService();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
