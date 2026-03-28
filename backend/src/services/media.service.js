import * as Model from "../models/media.model.js";

const VALID_TYPES = ["youtube", "tiktok", "instagram", "announcement"];

const validate = ({ type, title, url }) => {
  if (!title?.trim()) throw new Error("title is required");
  if (!VALID_TYPES.includes(type))
    throw new Error(`type must be one of: ${VALID_TYPES.join(", ")}`);
  if (type !== "announcement" && !url?.trim())
    throw new Error("url is required for this type");
};

export const getPublicMedia = async ({ type, search, limit, offset } = {}) => {
  const { rows } = await Model.getAllMediaQuery({
    type,
    search,
    limit,
    offset,
  });
  return rows;
};

export const getAdminMedia = async ({ type, search, limit, offset } = {}) => {
  const { rows } = await Model.getAllMediaAdminQuery({
    type,
    search,
    limit,
    offset,
  });
  return rows;
};

export const getMediaById = async (id) => {
  const { rows } = await Model.getMediaByIdQuery(id);
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};

export const createMedia = async (data) => {
  validate(data);
  const { rows } = await Model.createMediaQuery(data);
  return rows[0];
};

export const updateMedia = async (id, data) => {
  validate(data);
  const { rows } = await Model.updateMediaQuery({ id, ...data });
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};

export const deleteMedia = async (id) => {
  const { rows } = await Model.deleteMediaQuery(id);
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};

export const togglePublished = async (id) => {
  const { rows } = await Model.togglePublishedQuery(id);
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};
