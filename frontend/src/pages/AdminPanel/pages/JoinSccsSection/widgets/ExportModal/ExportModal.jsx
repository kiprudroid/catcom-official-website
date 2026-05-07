import { useState } from "react";
import styles from "./ExportModal.module.css";

export default function ExportModal({ joinRequests, onClose }) {
  const [exportRange, setExportRange] = useState("all");
  const [exportScc, setExportScc] = useState("all");

  const allSccNames = [...new Set(joinRequests.map((r) => r.scc_name))].sort();

  const getExportRows = () => {
    let rows = [...joinRequests];
    if (exportScc !== "all")
      rows = rows.filter((r) => r.scc_name === exportScc);
    if (exportRange !== "all") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - Number(exportRange));
      rows = rows.filter((r) =>
        r.created_at ? new Date(r.created_at) >= cutoff : true,
      );
    }
    return rows;
  };

  const handleDownload = () => {
    const rows = getExportRows();
    const dateStr = new Date().toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const tableRows = rows
      .map(
        (r, i) => `<tr>
        <td>${i + 1}</td><td>${r.full_name}</td><td>${r.phone_number}</td>
        <td>${r.email}</td><td>Year ${r.year_study}</td><td>${r.gender}</td><td>${r.scc_name}</td>
      </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>SCC Members Export</title>
<style>
  body{font-family:Arial,sans-serif;padding:32px;color:#1a1a1a}
  h1{font-size:20px;margin-bottom:4px}
  .meta{font-size:12px;color:#666;margin-bottom:24px}
  table{width:100%;border-collapse:collapse;font-size:12px}
  th{background:#0d9488;color:#fff;padding:8px 10px;text-align:left}
  td{padding:7px 10px;border-bottom:1px solid #e5e7eb}
  tr:nth-child(even) td{background:#f9fafb}
  .footer{margin-top:24px;font-size:11px;color:#9ca3af}
</style></head><body>
<h1>CATCOM – SCC Members Report</h1>
<p class="meta">Generated: ${dateStr} | SCC: ${exportScc === "all" ? "All SCCs" : exportScc} | Period: ${exportRange === "all" ? "All time" : `Last ${exportRange} day(s)`} | Total: ${rows.length} member(s)</p>
<table><thead><tr><th>#</th><th>Full Name</th><th>Phone</th><th>Email</th><th>Year</th><th>Gender</th><th>SCC</th></tr></thead>
<tbody>${tableRows}</tbody></table>
<p class="footer">CATCOM Admin Panel · JKUAT</p>
<script>window.onload=()=>window.print()<\/script>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (!win) alert("Allow popups to export the PDF.");
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        <h3 className={styles.title}>Export Members as PDF</h3>
        <p className={styles.desc}>Choose filters for your report.</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label}>Time Period</label>
            <select
              className={styles.select}
              value={exportRange}
              onChange={(e) => setExportRange(e.target.value)}
            >
              <option value="all">All time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>SCC</label>
            <select
              className={styles.select}
              value={exportScc}
              onChange={(e) => setExportScc(e.target.value)}
            >
              <option value="all">All SCCs</option>
              {allSccNames.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className={styles.count}>
          {getExportRows().length} member(s) will be included
        </p>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          ⬇ Download PDF
        </button>
      </div>
    </div>
  );
}
