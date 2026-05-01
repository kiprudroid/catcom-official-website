import React, { useState } from "react";
import styles from "./RangeReportModal.module.css";
import { fetchAttendanceByRange } from "@/api/attendance.api";

const csvCell = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;

const exportRangeCSV = (data, groupName, startDate, endDate) => {
  const meta = [
    [csvCell("Group"), csvCell(groupName || "Unknown")],
    [csvCell("Period"), csvCell(`${startDate} to ${endDate}`)],
    [],
  ];
  const header = [
    "#",
    "Name",
    "Phone",
    "Role",
    "Total Meetings",
    "Present",
    "Absent",
    "Apology",
    "Attendance Rate (%)",
  ].map(csvCell);
  const rows = data.map((m, i) =>
    [
      i + 1,
      m.name,
      m.phone || "",
      m.role,
      m.total_meetings,
      m.present_count,
      m.absent_count,
      m.apology_count,
      m.attendance_rate ?? 0,
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
  a.download = `${(groupName || "attendance").replace(/\s+/g, "_")}_${startDate}_to_${endDate}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const exportRangePDF = (data, groupName, startDate, endDate) => {
  const rows = data
    .map((m, i) => {
      const rate = Number(m.attendance_rate ?? 0);
      const rateColor =
        rate >= 75 ? "#16a34a" : rate >= 50 ? "#d97706" : "#dc2626";
      return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
  <td>${i + 1}</td><td><strong>${m.name}</strong></td><td>${m.phone || "—"}</td><td>${m.role}</td>
  <td style="text-align:center">${m.total_meetings}</td>
  <td style="text-align:center;color:#16a34a;font-weight:700">${m.present_count}</td>
  <td style="text-align:center;color:#dc2626">${m.absent_count}</td>
  <td style="text-align:center;color:#d97706">${m.apology_count}</td>
  <td style="text-align:center;font-weight:700;color:${rateColor}">${rate}%</td>
</tr>`;
    })
    .join("");
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${groupName} — Attendance Report ${startDate} to ${endDate}</title>
<style>
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
  body{font-family:'Segoe UI',sans-serif;padding:36px;color:#1c3a3a;margin:0;}
  h1{font-size:20px;font-weight:800;margin:0 0 4px;}p{font-size:13px;color:#6b7280;margin:0 0 20px;}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  th{background:#1c3a3a;color:white;padding:9px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.07em;}
  td{padding:9px 12px;border-bottom:1px solid #f3f4f6;}
  .footer{margin-top:28px;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:10px;}
</style></head><body>
<h1>${groupName || "Group"} — Attendance Report</h1>
<p>Period: <strong>${startDate}</strong> to <strong>${endDate}</strong> &nbsp;·&nbsp; Members: <strong>${data.length}</strong></p>
<table><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Role</th><th>Meetings</th><th>Present</th><th>Absent</th><th>Apology</th><th>Rate</th></tr></thead>
<tbody>${rows}</tbody></table>
<div class="footer">Generated: ${new Date().toLocaleString()}</div>
</body></html>`;
  const win = window.open("", "_blank", "width=1000,height=700");
  if (!win) {
    alert("Please allow popups for this site and try again.");
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

const RangeReportModal = ({ groupName, onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async (format) => {
    if (!startDate || !endDate) {
      setError("Please select both dates.");
      return;
    }
    if (startDate > endDate) {
      setError("Start date must be before end date.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await fetchAttendanceByRange(startDate, endDate);
      if (format === "csv") exportRangeCSV(data, groupName, startDate, endDate);
      else exportRangePDF(data, groupName, startDate, endDate);
    } catch {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h4 className={styles.title}>Date Range Report</h4>
        <p className={styles.subtitle}>
          Generate a per-member attendance summary for any date range — useful
          for semester reviews.
        </p>
        <div className={styles.fields}>
          <label className={styles.fieldLabel}>
            From
            <input
              type="date"
              className={styles.input}
              value={startDate}
              max={endDate || today}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className={styles.fieldLabel}>
            To
            <input
              type="date"
              className={styles.input}
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={styles.downloadBtn}
            onClick={() => generate("csv")}
            disabled={loading}
          >
            {loading ? "…" : "↓ CSV"}
          </button>
          <button
            className={styles.downloadBtn}
            onClick={() => generate("pdf")}
            disabled={loading}
          >
            {loading ? "…" : "↓ PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RangeReportModal;
