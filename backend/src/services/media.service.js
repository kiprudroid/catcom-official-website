import * as Model from "../models/media.model.js";
import fs from "fs";
import path from "path";

const VALID_TYPES = [
  "youtube",
  "tiktok",
  "instagram",
  "announcement",
  "poster",
];

const validate = ({ type, title, url }) => {
  if (!title?.trim()) throw new Error("title is required");
  if (!VALID_TYPES.includes(type))
    throw new Error(`type must be one of: ${VALID_TYPES.join(", ")}`);
  if (!["announcement", "poster"].includes(type) && !url?.trim())
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

export const createMedia = async (data, file) => {
  validate(data);

  let thumbnail = null;
  if (data.type === "poster") {
    if (!file) throw new Error("Poster image is required");
    thumbnail = `/uploads/posters/${file.filename}`;
  }

  const payload = {
    ...data,
    url: data.url || null,
    description: data.description || null,
    thumbnail,
    published:
      data.published === true ||
      data.published === "true" ||
      data.published === "on",
  };

  const { rows } = await Model.createMediaQuery(payload);
  return rows[0];
};

// ── FIX: was missing Model.updateMediaQuery call and return ──────
export const updateMedia = async (id, data, file) => {
  validate(data);

  const existing = await getMediaById(id);
  let thumbnail = existing.thumbnail;

  if (data.type === "poster" && file) {
    if (existing.thumbnail) {
      const oldPath = path.join(process.cwd(), "public", existing.thumbnail);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    thumbnail = `/uploads/posters/${file.filename}`;
  }

  const payload = {
    id,
    ...data,
    url: data.url || null,
    description: data.description || null,
    thumbnail,
    published:
      data.published === true ||
      data.published === "true" ||
      data.published === "on",
  };

  const { rows } = await Model.updateMediaQuery(payload);
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};

export const deleteMedia = async (id) => {
  const existing = await getMediaById(id);

  if (existing.type === "poster" && existing.thumbnail) {
    const filePath = path.join(process.cwd(), "public", existing.thumbnail);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  const { rows } = await Model.deleteMediaQuery(id);
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};

export const togglePublished = async (id) => {
  const { rows } = await Model.togglePublishedQuery(id);
  if (!rows[0]) throw new Error("Media item not found");
  return rows[0];
};
