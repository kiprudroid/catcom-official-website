import * as Service from "../services/media.service.js";

// ── Public ────────────────────────────────────────────────────────
export const getPublicMedia = async (req, res, next) => {
  try {
    const { type, search, limit, offset } = req.query;
    res.json(await Service.getPublicMedia({ type, search, limit, offset }));
  } catch (err) {
    next(err);
  }
};

// ── Admin ─────────────────────────────────────────────────────────
export const getAdminMedia = async (req, res, next) => {
  try {
    const { type, search, limit, offset } = req.query;
    res.json(await Service.getAdminMedia({ type, search, limit, offset }));
  } catch (err) {
    next(err);
  }
};

export const createMedia = async (req, res, next) => {
  try {
    res.status(201).json(await Service.createMedia(req.body));
  } catch (err) {
    next(err);
  }
};

export const updateMedia = async (req, res, next) => {
  try {
    res.json(await Service.updateMedia(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    await Service.deleteMedia(req.params.id);
    res.json({ message: "Media item deleted" });
  } catch (err) {
    next(err);
  }
};

export const togglePublished = async (req, res, next) => {
  try {
    res.json(await Service.togglePublished(req.params.id));
  } catch (err) {
    next(err);
  }
};
