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

// Safely escape a value for CSV — wraps in quotes and escapes inner quotes
const csvCell = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;

const AttendanceTable = ({
  members,
  updateAttendance,
  meetingDate,
  groupName,
}) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const roles = [...new Set(members.map((m) => m.role))];

  const filteredMembers = members.filter((m) => {
    const matchName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? m.role === roleFilter : true;
    return matchName && matchRole;
  });

  const copyPhone = (id, phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  };

  const downloadCSV = () => {
    const meta = [
      [csvCell("Group"), csvCell(groupName || "Unknown")],
      [csvCell("Date"), csvCell(meetingDate || "Unknown")],
      [],
    ];

    const header = [
      "#",
      "Name",
      "Phone",
      "Role",
      "Status",
      "Consecutive Absences",
      "Recent Absences (60d)",
    ].map(csvCell);

    const rows = filteredMembers.map((m, i) =>
      [
        i + 1,
        m.name,
        m.phone || "",
        m.role,
        m.attendance,
        m.consecutiveAbsence,
        m.recentAbsences ?? 0,
      ].map(csvCell),
    );

    const csv = [
      ...meta.map((r) => r.join(",")),
      header.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(groupName || "attendance").replace(/\s+/g, "_")}_${meetingDate || "date"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
        const { color, bg } =
          PDF_STATUS_COLORS[m.attendance] || PDF_STATUS_COLORS.absent;
        const isAtRisk = m.consecutiveAbsence >= 3;

        return `
<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
  <td>${i + 1}</td>
  <td>
    <strong>${m.name}</strong>
    ${isAtRisk ? '<span style="margin-left:6px;color:#d97706;font-size:11px;font-weight:700">(At Risk)</span>' : ""}
  </td>
  <td>${m.phone || "—"}</td>
  <td>${m.role}</td>
  <td>
    <span style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;background:${bg};color:${color}">
      ${statusMeta[m.attendance]?.label ?? "Absent"}
    </span>
  </td>
  <td style="text-align:center;${isAtRisk ? "color:#ef4444;font-weight:700" : ""}">
    ${m.consecutiveAbsence}
  </td>
  <td style="text-align:center;color:#6b7280">
    ${m.recentAbsences ?? 0}
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
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
  body { font-family: 'Segoe UI', sans-serif; padding: 36px; color: #1c3a3a; margin: 0; }
  .header h1 { font-size: 20px; font-weight: 800; margin: 0 0 4px; }
  .header p { font-size: 13px; color: #6b7280; margin: 0; }
  .summary { display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap; }
  .chip { padding: 5px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 4px; }
  th { background: #1c3a3a; color: white; padding: 9px 12px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: .07em; }
  td { padding: 9px 12px; border-bottom: 1px solid #f3f4f6; }
  .footer { margin-top: 28px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 10px; }
</style>
</head>
<body>
<div class="header">
  <h1>${groupName || "Group"} Attendance</h1>
  <p>Meeting Date: <strong>${meetingDate || "N/A"}</strong> &nbsp;·&nbsp; Total Members: <strong>${filteredMembers.length}</strong></p>
</div>
<div class="summary">
  <span class="chip" style="background:#dcfce7;color:#16a34a">✓ Present: ${present}</span>
  <span class="chip" style="background:#fee2e2;color:#dc2626">✗ Absent: ${absent}</span>
  <span class="chip" style="background:#fef3c7;color:#d97706">~ Apology: ${apology}</span>
  <span class="chip" style="background:#f3f4f6;color:#374151">Rate: ${rate}%</span>
</div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Role</th>
      <th>Status</th>
      <th>Consec. Absences</th>
      <th>Recent (60d)</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
<div class="footer">Generated: ${new Date().toLocaleString()}</div>
</body>
</html>`;

    // Open in a new window and trigger the browser's native print-to-PDF dialog.
    // The user selects "Save as PDF" in the print destination — this is the
    // standard cross-browser way to get a real PDF without any library.
    const win = window.open("", "_blank", "width=900,height=650");

    if (!win) {
      alert(
        "Popups are blocked. Please allow popups for this site and try again.\n\n" +
          "In Chrome: click the blocked popup icon in the address bar → Allow.",
      );
      return;
    }

    win.document.write(html);
    win.document.close();

    // Use onload so styles are applied before print dialog opens
    win.onload = () => {
      setTimeout(() => {
        win.focus();
        win.print();
        // Don't close the window — closing it cancels an in-progress save
      }, 300);
    };

    // Fallback: if onload already fired before we attached the handler
    setTimeout(() => {
      if (win && !win.closed) {
        win.focus();
        win.print();
      }
    }, 700);
  };

  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        No members yet. Add members using the panel above.
      </div>
    );
  }

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

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Search member..."
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

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Consecutive Absences</th>
              <th>Absences (Last 60 Days)</th>
              <th>Mark</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member, idx) => {
              const meta = statusMeta[member.attendance] ?? statusMeta.absent;

              const isAtRisk =
                member.consecutiveAbsence >= 3 &&
                (!member.lastFollowUp ||
                  new Date(member.lastFollowUp) < new Date(meetingDate));

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

                  <td className={styles.phoneCell}>
                    {member.phone ? (
                      <button
                        className={`${styles.phoneBtn} ${
                          copiedId === member.id ? styles.phoneCopied : ""
                        }`}
                        onClick={() => copyPhone(member.id, member.phone)}
                      >
                        {copiedId === member.id ? "Copied!" : member.phone}
                      </button>
                    ) : (
                      <span className={styles.phoneEmpty}>—</span>
                    )}
                  </td>

                  <td className={styles.role}>{member.role}</td>

                  <td>
                    <span className={`${styles.statusBadge} ${meta.cls}`}>
                      {meta.label}
                    </span>
                  </td>

                  {/* Consecutive absences — resets after follow-up */}
                  <td className={styles.absCount}>
                    <span className={isAtRisk ? styles.absHigh : ""}>
                      {member.consecutiveAbsence}
                    </span>
                  </td>

                  {/* Total absences in last 60 days — never resets */}
                  <td className={styles.absCount}>
                    <span
                      className={
                        (member.recentAbsences ?? 0) >= 5 ? styles.absHigh : ""
                      }
                    >
                      {member.recentAbsences ?? 0}
                    </span>
                  </td>

                  <td>
                    <div className={styles.toggle}>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          className={`${styles.toggleBtn} ${
                            member.attendance === s ? styles[`active_${s}`] : ""
                          }`}
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
