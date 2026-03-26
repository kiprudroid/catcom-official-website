import * as Service from "../services/attendance.service.js";

// ── Groups (super admin) ──────────────────────────────────────────

export const getGroups = async (req, res, next) => {
  try {
    res.json(await Service.getAllGroups());
  } catch (err) {
    next(err);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    res.json(await Service.getGroupById(req.params.id));
  } catch (err) {
    next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    res.status(201).json(await Service.createGroup(req.body));
  } catch (err) {
    next(err);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    res.json(await Service.updateGroup({ id: req.params.id, ...req.body }));
  } catch (err) {
    next(err);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    await Service.deleteGroup(req.params.id);
    res.json({ message: "Group deleted" });
  } catch (err) {
    next(err);
  }
};

// ── Group Admin Management (super admin) ──────────────────────────

export const getGroupAdmin = async (req, res, next) => {
  try {
    res.json(await Service.getGroupAdmin(req.params.group_id));
  } catch (err) {
    next(err);
  }
};

export const createGroupAdmin = async (req, res, next) => {
  try {
    res.status(201).json(await Service.createGroupAdmin(req.body));
  } catch (err) {
    next(err);
  }
};

export const updateGroupAdminPassword = async (req, res, next) => {
  try {
    res.json(
      await Service.updateGroupAdminPassword({
        group_id: req.params.group_id,
        password: req.body.password,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const deleteGroupAdmin = async (req, res, next) => {
  try {
    await Service.deleteGroupAdmin(req.params.group_id);
    res.json({ message: "Admin account deleted" });
  } catch (err) {
    next(err);
  }
};

// ── Group Admin Login (public) ────────────────────────────────────

export const loginGroupAdmin = async (req, res, next) => {
  try {
    const result = await Service.loginGroupAdmin(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// ── Members (group admin) ─────────────────────────────────────────

export const getMembers = async (req, res, next) => {
  try {
    // group_id comes from JWT (req.user) for group admins
    const group_id = req.params.group_id || req.user.group_id;
    res.json(await Service.getMembersByGroup(group_id));
  } catch (err) {
    next(err);
  }
};

export const createMember = async (req, res, next) => {
  try {
    const group_id = req.user.group_id;
    res.status(201).json(await Service.addMember({ group_id, ...req.body }));
  } catch (err) {
    next(err);
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const group_id = req.user.group_id;
    res.json(
      await Service.updateMember({ id: req.params.id, group_id, ...req.body }),
    );
  } catch (err) {
    next(err);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const group_id = req.user.group_id;
    res.json(await Service.removeMember({ id: req.params.id, group_id }));
  } catch (err) {
    next(err);
  }
};

// ── Attendance (group admin) ──────────────────────────────────────

export const getAttendance = async (req, res, next) => {
  try {
    const group_id = req.user.group_id;
    res.json(
      await Service.getAttendanceByDate({ group_id, date: req.params.date }),
    );
  } catch (err) {
    next(err);
  }
};

export const upsertAttendance = async (req, res, next) => {
  try {
    const group_id = req.user.group_id;
    res.json(await Service.markAttendance({ group_id, ...req.body }));
  } catch (err) {
    next(err);
  }
};
