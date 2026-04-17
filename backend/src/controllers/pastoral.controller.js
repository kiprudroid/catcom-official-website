import * as pastoralService from "../services/pastoral.service.js";

// ── Members ───────────────────────────────────────────────────────

export const getMembers = async (req, res, next) => {
  try {
    const members = await pastoralService.getAllMembers();
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};

export const getMember = async (req, res, next) => {
  try {
    const member = await pastoralService.getMemberById(req.params.id);
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
};

export const createMember = async (req, res, next) => {
  try {
    const member = await pastoralService.addMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

export const editMember = async (req, res, next) => {
  try {
    const member = await pastoralService.updateMember(req.params.id, req.body);
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const member = await pastoralService.removeMember(req.params.id);
    res.status(200).json({ message: "Member removed", member });
  } catch (err) {
    next(err);
  }
};

// ── Attendance ────────────────────────────────────────────────────

export const getAttendance = async (req, res, next) => {
  try {
    const attendance = await pastoralService.getAttendanceByDate(
      req.params.date,
    );
    res.status(200).json(attendance);
  } catch (err) {
    next(err);
  }
};

export const upsertAttendance = async (req, res, next) => {
  try {
    const record = await pastoralService.markAttendance(req.body);
    res.status(200).json(record);
  } catch (err) {
    next(err);
  }
};
