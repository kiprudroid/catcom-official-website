export const STATUS_OPTIONS = ["present", "absent", "apology"];

export const STATUS_META = {
  present: { label: "Present" },
  absent: { label: "Absent" },
  apology: { label: "Apology" },
};

export const PDF_STATUS_COLORS = {
  present: { color: "#16a34a", bg: "#dcfce7" },
  absent: { color: "#dc2626", bg: "#fee2e2" },
  apology: { color: "#d97706", bg: "#fef3c7" },
};

// ─── CSV helper

export const csvCell = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;

// ─── Single-date CSV export

export const exportSingleCSV = (
  members,
  groupName,
  meetingDate,
  meetingPurpose,
  meetingActivities,
  visitors = [],
) => {
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
  const rows = members.map((m, i) =>
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

  // ─── Visitors section
  const visitorRows = visitors.length
    ? [
        [],
        [csvCell("VISITORS & ALUMNI")],
        ["#", "Name", "Phone", "Type"].map(csvCell),
        ...visitors.map((v, i) =>
          [i + 1, v.name, v.phone || "", "Visitor"].map(csvCell),
        ),
      ]
    : [];

  const csv = [
    ...meta.map((r) => r.join(",")),
    header.join(","),
    ...rows.map((r) => r.join(",")),
    ...visitorRows.map((r) => r.join(",")),
  ].join("\n");

  triggerDownload(
    csv,
    "text/csv",
    `${slugify(groupName)}_${meetingDate || "date"}.csv`,
  );
};

// ─── Single-date PDF export

export const exportSinglePDF = (
  members,
  groupName,
  meetingDate,
  meetingPurpose,
  meetingActivities,
  visitors = [],
) => {
  const present = members.filter((m) => m.attendance === "present").length;
  const absent = members.filter((m) => m.attendance === "absent").length;
  const apology = members.filter((m) => m.attendance === "apology").length;
  const rate = members.length
    ? Math.round((present / members.length) * 100)
    : 0;

  const meetingDetailsBlock = meetingPurpose
    ? `
    <div class="details-box">
      <div class="details-row">
        <div class="details-field">
          <span class="details-label">Purpose of Meeting</span>
          <p class="details-value">${meetingPurpose}</p>
        </div>
        ${
          meetingActivities
            ? `
        <div class="details-field">
          <span class="details-label">Activities Done</span>
          <p class="details-value">${meetingActivities}</p>
        </div>`
            : ""
        }
      </div>
    </div>`
    : "";

  const rows = members
    .map((m, i) => {
      const { color, bg } =
        PDF_STATUS_COLORS[m.attendance] || PDF_STATUS_COLORS.absent;
      const atRisk = m.consecutiveAbsence >= 3;
      return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
  <td>${i + 1}</td>
  <td><strong>${m.name}</strong>${atRisk ? ' <span style="color:#d97706;font-size:11px;font-weight:700">(At Risk)</span>' : ""}</td>
  <td>${m.phone || "—"}</td><td>${m.role}</td>
  <td><span style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;background:${bg};color:${color}">${STATUS_META[m.attendance]?.label ?? "Absent"}</span></td>
  <td style="text-align:center;${atRisk ? "color:#ef4444;font-weight:700" : ""}">${m.consecutiveAbsence}</td>
  <td style="text-align:center;color:#6b7280">${m.recentAbsences ?? 0}</td>
</tr>`;
    })
    .join("");

  // ─── Visitors section
  const visitorsBlock = visitors.length
    ? `
    <div style="margin-top:32px;">
      <h2 style="font-size:15px;font-weight:800;margin:0 0 4px;color:#065f46;">
        Visitors &amp; Alumni
      </h2>
      <p style="font-size:12px;color:#6b7280;margin:0 0 10px;">
        ${visitors.length} visitor${visitors.length !== 1 ? "s" : ""} recorded for this meeting
      </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          ${visitors
            .map(
              (v, i) => `
          <tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
            <td>${i + 1}</td>
            <td><strong>${v.name}</strong></td>
            <td>${v.phone || "—"}</td>
            <td>
              <span style="padding:3px 10px;border-radius:20px;font-size:12px;
                font-weight:600;background:#d1fae5;color:#065f46;">
                Visitor
              </span>
            </td>
          </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>`
    : "";

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${groupName} Attendance — ${meetingDate}</title>
<style>
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
  body{font-family:'Segoe UI',sans-serif;padding:36px;color:#1c3a3a;margin:0;}
  h1{font-size:20px;font-weight:800;margin:0 0 4px;}
  p{font-size:13px;color:#6b7280;margin:0;}
  .summary{display:flex;gap:10px;margin:16px 0 20px;flex-wrap:wrap;}
  .chip{padding:5px 14px;border-radius:8px;font-size:12px;font-weight:700;}
  .details-box{background:#f0fdf9;border:1.5px solid #d1fae5;border-radius:10px;padding:12px 16px;margin:14px 0 20px;}
  .details-row{display:flex;gap:24px;flex-wrap:wrap;}
  .details-field{flex:1 1 200px;display:flex;flex-direction:column;gap:3px;}
  .details-label{font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em;}
  .details-value{font-size:13px;color:#1f2937;line-height:1.55;margin:0;font-weight:500;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-top:4px;}
  th{background:#1c3a3a;color:white;padding:9px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.07em;}
  td{padding:9px 12px;border-bottom:1px solid #f3f4f6;}
  .footer{margin-top:28px;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:10px;}
</style></head><body>
<h1>${groupName || "Group"} Attendance</h1>
<p>Meeting Date: <strong>${meetingDate || "N/A"}</strong> &nbsp;·&nbsp; Total Members: <strong>${members.length}</strong></p>
<div class="summary">
  <span class="chip" style="background:#dcfce7;color:#16a34a">✓ Present: ${present}</span>
  <span class="chip" style="background:#fee2e2;color:#dc2626">✗ Absent: ${absent}</span>
  <span class="chip" style="background:#fef3c7;color:#d97706">~ Apology: ${apology}</span>
  <span class="chip" style="background:#f3f4f6;color:#374151">Rate: ${rate}%</span>
</div>
${meetingDetailsBlock}
<table><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Role</th><th>Status</th><th>Consec. Absences</th><th>Recent (60d)</th></tr></thead>
<tbody>${rows}</tbody></table>
${visitorsBlock}
<div class="footer">Generated: ${new Date().toLocaleString()}</div>
</body></html>`;

  openPrintWindow(html);
};

// ─── Internal helpers ─────

const slugify = (str) => (str || "attendance").replace(/\s+/g, "_");

const triggerDownload = (content, mimeType, filename) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const openPrintWindow = (html) => {
  const win = window.open("", "_blank", "width=900,height=650");
  if (!win) {
    alert(
      "Please allow popups for this site and try again.\n\nIn Chrome: click the blocked popup icon → Allow.",
    );
    return;
  }
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 300);
  };
  setTimeout(() => {
    if (win && !win.closed) {
      win.focus();
      win.print();
    }
  }, 700);
};
