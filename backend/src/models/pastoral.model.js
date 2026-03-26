import pool from "../config/db.config.js";

// ── Members ───────────────────────────────────────────────────────

export const getAllMembersQuery = () =>
  pool.query(`
    SELECT
      pm.*,
      COUNT(
        CASE WHEN a.status = 'absent'
          AND a.date > CURRENT_DATE - INTERVAL '60 days'
        THEN 1 END
      ) AS recent_absences,
      (
        SELECT COUNT(*)
        FROM attendance a2
        WHERE a2.member_id = pm.id
          AND a2.status = 'absent'
          AND a2.date = (
            SELECT MAX(date) FROM attendance WHERE member_id = pm.id
          )
      ) AS consecutive_absences
    FROM pastoral_members pm
    LEFT JOIN attendance a ON a.member_id = pm.id
    WHERE pm.status = 'active'
    GROUP BY pm.id
    ORDER BY pm.name ASC
  `);

export const getMemberByIdQuery = (id) =>
  pool.query(`SELECT * FROM pastoral_members WHERE id = $1`, [id]);

export const addMemberQuery = ({ name, role }) =>
  pool.query(
    `INSERT INTO pastoral_members (name, role) VALUES ($1, $2) RETURNING *`,
    [name, role],
  );

export const updateMemberQuery = ({ id, name, role, status }) => {
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
  if (status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(status);
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  return pool.query(
    `UPDATE pastoral_members SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
    values,
  );
};

// Soft delete — sets status to 'removed'
export const removeMemberQuery = (id) =>
  pool.query(
    `UPDATE pastoral_members SET status = 'removed', updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id],
  );

// ── Attendance ────────────────────────────────────────────────────

export const getAttendanceByDateQuery = (date) =>
  pool.query(
    `SELECT a.*, pm.name, pm.role
     FROM attendance a
     JOIN pastoral_members pm ON pm.id = a.member_id
     WHERE a.date = $1
     ORDER BY pm.name ASC`,
    [date],
  );

// Upsert — create or update attendance for a member on a given date
export const markAttendanceQuery = ({ member_id, date, status }) =>
  pool.query(
    `INSERT INTO attendance (member_id, date, status)
     VALUES ($1, $2, $3)
     ON CONFLICT (member_id, date)
     DO UPDATE SET status = EXCLUDED.status, updated_at = NOW()
     RETURNING *`,
    [member_id, date, status],
  );

// ── Consecutive absences (computed per member) ────────────────────
// Returns consecutive absence streak ending at latest recorded date
export const getConsecutiveAbsencesQuery = (member_id) =>
  pool.query(
    `WITH ordered AS (
       SELECT date, status,
              ROW_NUMBER() OVER (ORDER BY date DESC) AS rn
       FROM attendance
       WHERE member_id = $1
     )
     SELECT COUNT(*) AS streak
     FROM ordered
     WHERE status = 'absent'
       AND rn = (
         SELECT MIN(rn) FROM ordered
         WHERE status != 'absent' OR rn = 1
       ) - 1 + rn`,
    [member_id],
  );
