import pool from "../config/db.config.js";

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
    `INSERT INTO attendance_groups (name, type) VALUES ($1, $2) RETURNING *`,
    [name, type],
  );

export const updateGroupQuery = ({ id, name, type }) =>
  pool.query(
    `UPDATE attendance_groups SET name = $1, type = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
    [name, type, id],
  );

export const deleteGroupQuery = (id) =>
  pool.query(`DELETE FROM attendance_groups WHERE id = $1 RETURNING *`, [id]);

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
    `UPDATE attendance_admins SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING id, group_id, email`,
    [hashedPassword, id],
  );

export const deleteAdminQuery = (group_id) =>
  pool.query(`DELETE FROM attendance_admins WHERE group_id = $1 RETURNING *`, [
    group_id,
  ]);

export const getMembersByGroupQuery = (group_id) =>
  pool.query(
    `SELECT
      m.*,
      m.last_follow_up,

      -- Total absences in the last 60 days (regardless of streak)
      (
        SELECT COUNT(*)
        FROM attendance_records ar
        WHERE ar.member_id = m.id
          AND ar.status = 'absent'
          AND ar.date >= CURRENT_DATE - INTERVAL '60 days'
      ) AS recent_absences,

      -- True consecutive absences: count absences from latest record backwards
      -- stopping at the first non-absence. Resets after last_follow_up date.
      (
        WITH ordered AS (
          SELECT
            status,
            date,
            ROW_NUMBER() OVER (ORDER BY date DESC) AS rn
          FROM attendance_records
          WHERE member_id = m.id
            -- Only count records after the last follow-up (streak resets on follow-up)
            AND (m.last_follow_up IS NULL OR date > m.last_follow_up::date)
          ORDER BY date DESC
        ),
        -- Find how many leading rows are absent before first non-absent
        streak AS (
          SELECT status
          FROM ordered
          WHERE rn <= COALESCE(
            (SELECT MIN(rn) - 1 FROM ordered WHERE status != 'absent'),
            (SELECT COUNT(*) FROM ordered)  -- all are absent
          )
        )
        SELECT COUNT(*) FROM streak WHERE status = 'absent'
      ) AS consecutive_absences

    FROM attendance_members m
    WHERE m.group_id = $1 AND m.status = 'active'
    ORDER BY m.name ASC`,
    [group_id],
  );

export const addMemberQuery = ({ group_id, name, phone, role, family_name }) =>
  pool.query(
    `INSERT INTO attendance_members (group_id, name, phone, role, family_name)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [group_id, name, phone || null, role, family_name || null],
  );

export const updateMemberQuery = ({
  id,
  group_id,
  name,
  phone,
  role,
  family_name,
}) => {
  const fields = [];
  const values = [];
  let idx = 1;

  if (name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(name);
  }
  if (phone !== undefined) {
    fields.push(`phone = $${idx++}`);
    values.push(phone || null);
  }
  if (role !== undefined) {
    fields.push(`role = $${idx++}`);
    values.push(role);
  }
  if (family_name !== undefined) {
    fields.push(`family_name = $${idx++}`);
    values.push(family_name || null);
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

export const getAttendanceByDateQuery = ({ group_id, date }) =>
  pool.query(
    `SELECT ar.*, m.name, m.phone, m.role
     FROM attendance_records ar
     JOIN attendance_members m ON m.id = ar.member_id
     WHERE m.group_id = $1 AND ar.date = $2
     ORDER BY m.name ASC`,
    [group_id, date],
  );

export const upsertAttendanceQuery = ({ member_id, date, status = "absent" }) =>
  pool.query(
    `INSERT INTO attendance_records (member_id, date, status)
     VALUES ($1, $2, $3)
     ON CONFLICT (member_id, date)
     DO UPDATE SET status = EXCLUDED.status, updated_at = NOW()
     RETURNING *`,
    [member_id, date, status],
  );

export const markFollowUpQuery = (id, group_id, meetingDate) =>
  pool.query(
    `UPDATE attendance_members
       SET last_follow_up = $3::date, updated_at = NOW()
       WHERE id = $1 AND group_id = $2
       RETURNING *`,
    [id, group_id, meetingDate],
  );

export const getAttendanceByRangeQuery = (group_id, startDate, endDate) =>
  pool.query(
    `SELECT
      m.id,
      m.name,
      m.role,
      m.phone,
      COUNT(ar.id)                                              AS total_meetings,
      COUNT(ar.id) FILTER (WHERE ar.status = 'present')        AS present_count,
      COUNT(ar.id) FILTER (WHERE ar.status = 'absent')         AS absent_count,
      COUNT(ar.id) FILTER (WHERE ar.status = 'apology')        AS apology_count,
      ROUND(
        COUNT(ar.id) FILTER (WHERE ar.status = 'present')::numeric
        / NULLIF(COUNT(ar.id), 0) * 100
      , 1)                                                      AS attendance_rate
    FROM attendance_members m
    LEFT JOIN attendance_records ar
      ON ar.member_id = m.id
      AND ar.date BETWEEN $2 AND $3
    WHERE m.group_id = $1
      AND m.status   = 'active'
    GROUP BY m.id, m.name, m.role, m.phone
    ORDER BY m.name ASC`,
    [group_id, startDate, endDate],
  );
