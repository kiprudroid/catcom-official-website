import React, { useState } from "react";
import styles from "./AttendanceTable.module.css";

const STATUS_OPTIONS = ["present", "absent", "apology"];

const statusMeta = {
  present: { label: "Present", cls: styles.statusPresent },
  absent: { label: "Absent", cls: styles.statusAbsent },
  apology: { label: "Apology", cls: styles.statusApology },
};

const PDF_STATUS_COLORS = {
  present: { color: "#16a34a", bg: "#dcfce7" },
  absent: { color: "#dc2626", bg: "#fee2e2" },
  apology: { color: "#d97706", bg: "#fef3c7" },
};

const AttendanceTable = ({
  members,
  updateAttendance,
  meetingDate,
  groupName,
}) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const roles = [...new Set(members.map((m) => m.role))];

  const filteredMembers = members.filter((m) => {
    const matchName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? m.role === roleFilter : true;
    return matchName && matchRole;
  });

  /* ── CSV download ─────────────────────────────────── */
  const downloadCSV = () => {
    const meta = [
      [`Group,${groupName || "Unknown"}`],
      [`Date,${meetingDate || "Unknown"}`],
      [],
    ];
    const header = ["#", "Name", "Role", "Status", "Consecutive Absences"];
    const rows = filteredMembers.map((m, i) => [
      i + 1,
      m.name,
      m.role,
      m.attendance,
      m.consecutiveAbsence,
    ]);
    const csv = [
      ...meta.map((r) => r.join(",")),
      header.map((c) => `"${c}"`).join(","),
      ...rows.map((r) => r.map((c) => `"${c}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(groupName || "attendance").replace(/\s+/g, "_")}_${meetingDate || "date"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ── PDF download ─────────────────────────────────── */
  const downloadPDF = () => {
    const present = filteredMembers.filter(
      (m) => m.attendance === "present",
    ).length;
    const absent = filteredMembers.filter(
      (m) => m.attendance === "absent",
    ).length;
    const apology = filteredMembers.filter(
      (m) => m.attendance === "apology",
    ).length;
    const rate = filteredMembers.length
      ? Math.round((present / filteredMembers.length) * 100)
      : 0;

    const rows = filteredMembers
      .map((m, i) => {
        // FIX: fallback to "absent" colours instead of "present"
        const { color, bg } =
          PDF_STATUS_COLORS[m.attendance] || PDF_STATUS_COLORS.absent;
        return `
<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
  <td>${i + 1}</td>
  <td>
    <strong>${m.name}</strong>
    ${m.consecutiveAbsence >= 2 ? '<span style="margin-left:6px;color:#d97706;font-size:11px;font-weight:700">(At Risk)</span>' : ""}
  </td>
  <td>${m.role}</td>
  <td>
    <span style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;background:${bg};color:${color}">
      ${statusMeta[m.attendance]?.label ?? "Absent"}
    </span>
  </td>
  <td style="text-align:center;${m.consecutiveAbsence >= 2 ? "color:#ef4444;font-weight:700" : ""}">
    ${m.consecutiveAbsence}
  </td>
</tr>`;
      })
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>${groupName} Attendance — ${meetingDate}</title>
<style>
body{font-family:'Segoe UI',sans-serif;padding:36px;color:#1c3a3a}
.header h1{font-size:20px;font-weight:800}
.header p{font-size:13px;color:#6b7280;margin-top:4px}
.summary{display:flex;gap:10px;margin:20px 0;flex-wrap:wrap}
.chip{padding:5px 14px;border-radius:8px;font-size:12px;font-weight:700}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#1c3a3a;color:white;padding:9px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.07em}
td{padding:9px 12px;border-bottom:1px solid #f3f4f6}
.footer{margin-top:28px;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:10px}
</style>
</head>
<body>
<div class="header">
  <h1>JKUAT CATCOM — ${groupName || "Group"} Attendance</h1>
  <p>Meeting Date: <strong>${meetingDate || "N/A"}</strong> · Total Members: <strong>${filteredMembers.length}</strong></p>
</div>
<div class="summary">
  <span class="chip" style="background:#dcfce7;color:#16a34a">✓ Present: ${present}</span>
  <span class="chip" style="background:#fee2e2;color:#dc2626">✗ Absent: ${absent}</span>
  <span class="chip" style="background:#fef3c7;color:#d97706">~ Apology: ${apology}</span>
  <span class="chip" style="background:#f3f4f6;color:#374151">Rate: ${rate}%</span>
</div>
<table>
  <thead>
    <tr><th>#</th><th>Name</th><th>Role</th><th>Status</th><th>Consec. Absences</th></tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
<div class="footer">Generated: ${new Date().toLocaleString()} · JKUAT CATCOM Attendance System</div>
</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 600);
  };

  /* ── Empty state ──────────────────────────────────── */
  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        No members yet. Add members using the panel above.
      </div>
    );
  }

  /* ── Main render ──────────────────────────────────── */
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.heading}>Attendance Register</h3>
        <div className={styles.actions}>
          <button className={styles.downloadBtn} onClick={downloadCSV}>
            ↓ CSV
          </button>
          <button className={styles.downloadBtn} onClick={downloadPDF}>
            ↓ PDF
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Search member by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.roleFilter}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Consec. Absences</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, idx) => {
              // FIX: fallback to absent instead of present
              const meta = statusMeta[member.attendance] ?? statusMeta.absent;
              const isAtRisk = member.consecutiveAbsence >= 2;

              return (
                <tr
                  key={member.id}
                  className={`${styles.row} ${isAtRisk ? styles.riskRow : ""}`}
                >
                  <td className={styles.idx}>{idx + 1}</td>

                  <td className={styles.name}>
                    {member.name}
                    {isAtRisk && (
                      <span className={styles.riskBadge}>At Risk</span>
                    )}
                  </td>

                  <td className={styles.role}>{member.role}</td>

                  <td>
                    <span className={`${styles.statusBadge} ${meta.cls}`}>
                      {meta.label}
                    </span>
                  </td>

                  <td className={styles.absCount}>
                    <span className={isAtRisk ? styles.absHigh : ""}>
                      {member.consecutiveAbsence}
                    </span>
                  </td>

                  <td>
                    <div className={styles.toggle}>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          className={`${styles.toggleBtn} ${member.attendance === s ? styles[`active_${s}`] : ""}`}
                          onClick={() => updateAttendance(member.id, s)}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
