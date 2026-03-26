import pool from "../config/db.config.js";

// ── Groups ────────────────────────────────────────────────────────

export const getAllGroupsQuery = () =>
  pool.query(`
    SELECT
      g.*,
      COUNT(DISTINCT m.id) FILTER (WHERE m.status = 'active') AS member_count,
      a.email AS admin_email
    FROM attendance_groups g
    LEFT JOIN attendance_members m ON m.group_id = g.id
    LEFT JOIN attendance_admins a ON a.group_id = g.id
    GROUP BY g.id, a.email
    ORDER BY g.name ASC
  `);

export const getGroupByIdQuery = (id) =>
  pool.query(`SELECT * FROM attendance_groups WHERE id = $1`, [id]);

export const createGroupQuery = ({ name, type }) =>
  pool.query(
    `INSERT INTO attendance_groups (name, type)
     VALUES ($1, $2) RETURNING *`,
    [name, type],
  );

export const updateGroupQuery = ({ id, name, type }) =>
  pool.query(
    `UPDATE attendance_groups
     SET name = $1, type = $2, updated_at = NOW()
     WHERE id = $3 RETURNING *`,
    [name, type, id],
  );

export const deleteGroupQuery = (id) =>
  pool.query(`DELETE FROM attendance_groups WHERE id = $1 RETURNING *`, [id]);

// ── Group Admins ──────────────────────────────────────────────────

export const getAdminByEmailQuery = (email) =>
  pool.query(
    `SELECT aa.*, ag.name AS group_name, ag.type AS group_type
     FROM attendance_admins aa
     JOIN attendance_groups ag ON ag.id = aa.group_id
     WHERE aa.email = $1`,
    [email],
  );

export const getAdminByGroupIdQuery = (group_id) =>
  pool.query(
    `SELECT id, group_id, email, created_at FROM attendance_admins WHERE group_id = $1`,
    [group_id],
  );

export const createAdminQuery = ({ group_id, email, hashedPassword }) =>
  pool.query(
    `INSERT INTO attendance_admins (group_id, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, group_id, email, created_at`,
    [group_id, email, hashedPassword],
  );

export const updateAdminPasswordQuery = ({ id, hashedPassword }) =>
  pool.query(
    `UPDATE attendance_admins
     SET password = $1, updated_at = NOW()
     WHERE id = $2 RETURNING id, group_id, email`,
    [hashedPassword, id],
  );

export const deleteAdminQuery = (group_id) =>
  pool.query(`DELETE FROM attendance_admins WHERE group_id = $1 RETURNING *`, [
    group_id,
  ]);

// ── Members ───────────────────────────────────────────────────────

export const getMembersByGroupQuery = (group_id) =>
  pool.query(
    `SELECT
       m.*,
       (
         SELECT COUNT(*) FROM attendance_records ar
         WHERE ar.member_id = m.id
           AND ar.status = 'absent'
           AND ar.date >= CURRENT_DATE - INTERVAL '60 days'
       ) AS recent_absences,
       (
         WITH recent AS (
           SELECT status FROM attendance_records
           WHERE member_id = m.id
           ORDER BY date DESC LIMIT 5
         )
         SELECT COUNT(*) FROM recent WHERE status = 'absent'
       ) AS consecutive_absences
     FROM attendance_members m
     WHERE m.group_id = $1 AND m.status = 'active'
     ORDER BY m.name ASC`,
    [group_id],
  );

export const addMemberQuery = ({ group_id, name, role }) =>
  pool.query(
    `INSERT INTO attendance_members (group_id, name, role)
     VALUES ($1, $2, $3) RETURNING *`,
    [group_id, name, role],
  );

export const updateMemberQuery = ({ id, group_id, name, role }) => {
  const fields = [];
  const values = [];
  let idx = 1;
  if (name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(name);
  }
  if (role !== undefined) {
    fields.push(`role = $${idx++}`);
    values.push(role);
  }
  fields.push(`updated_at = NOW()`);
  values.push(id, group_id);
  return pool.query(
    `UPDATE attendance_members SET ${fields.join(", ")}
     WHERE id = $${idx++} AND group_id = $${idx} RETURNING *`,
    values,
  );
};

export const removeMemberQuery = ({ id, group_id }) =>
  pool.query(
    `UPDATE attendance_members SET status = 'removed', updated_at = NOW()
     WHERE id = $1 AND group_id = $2 RETURNING *`,
    [id, group_id],
  );

// ── Attendance Records ────────────────────────────────────────────

export const getAttendanceByDateQuery = ({ group_id, date }) =>
  pool.query(
    `SELECT ar.*, m.name, m.role
     FROM attendance_records ar
     JOIN attendance_members m ON m.id = ar.member_id
     WHERE m.group_id = $1 AND ar.date = $2
     ORDER BY m.name ASC`,
    [group_id, date],
  );

export const upsertAttendanceQuery = ({ member_id, date, status }) =>
  pool.query(
    `INSERT INTO attendance_records (member_id, date, status)
     VALUES ($1, $2, $3)
     ON CONFLICT (member_id, date)
     DO UPDATE SET status = EXCLUDED.status, updated_at = NOW()
     RETURNING *`,
    [member_id, date, status],
  );
