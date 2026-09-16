import pool from "../config/db.config.js";

export const recordAdminLoginQuery = (group_admin_id) =>
  pool.query(
    `INSERT INTO group_admin_logins (group_admin_id, logged_in_at)
     VALUES ($1, NOW())
     RETURNING logged_in_at`,
    [group_admin_id],
  );

export const getRecentLoginsQuery = (group_admin_id, since) =>
  pool.query(
    `SELECT logged_in_at
     FROM group_admin_logins
     WHERE group_admin_id = $1 AND logged_in_at >= $2
     ORDER BY logged_in_at DESC`,
    [group_admin_id, since],
  );

export const getAllAdminsQuery = () =>
  pool.query(`SELECT id, group_id FROM attendance_admins`);

export const getAllRecentLoginsQuery = (since) =>
  pool.query(
    `SELECT group_admin_id, logged_in_at
     FROM group_admin_logins
     WHERE logged_in_at >= $1
     ORDER BY logged_in_at DESC`,
    [since],
  );
