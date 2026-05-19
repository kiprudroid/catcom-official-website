import React, { useState } from "react";
import { FaUsers, FaUserAlt, FaFileCsv, FaFilePdf } from "react-icons/fa";
import {
  MemberRow,
  MemberSearch,
  AddMemberForm,
  EditMemberModal,
} from "./widgets";
import styles from "./MemberManager.module.css";

const exportCSV = (members, isSCC) => {
  const headers = [
    "Name",
    "Phone",
    "Role",
    isSCC ? "Family" : null,
    "Status",
  ].filter(Boolean);
  const rows = members.map((m) =>
    [
      m.name,
      m.phone || "",
      m.role,
      isSCC ? m.family_name || "" : null,
      m.inSession !== false ? "In Session" : "On Break",
    ].filter((v) => v !== null),
  );

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "members.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const exportPDF = (members, isSCC) => {
  const headers = [
    "Name",
    "Phone",
    "Role",
    isSCC ? "Family" : null,
    "Status",
  ].filter(Boolean);
  const rows = members.map((m) =>
    [
      m.name,
      m.phone || "—",
      m.role,
      isSCC ? m.family_name || "—" : null,
      m.inSession !== false ? "In Session" : "On Break",
    ].filter((v) => v !== null),
  );

  const tableRows = rows
    .map((row) => {
      const status = row[row.length - 1];
      const statusColor = status === "In Session" ? "#065f46" : "#9b4444";
      const statusBg = status === "In Session" ? "#d1fae5" : "#fde8e8";
      return `
        <tr>
          ${row
            .map((cell, i) => {
              const isStatus = i === row.length - 1;
              return `<td style="${isStatus ? `color:${statusColor};background:${statusBg};border-radius:4px;font-weight:600;text-align:center;` : ""}">${cell}</td>`;
            })
            .join("")}
        </tr>`;
    })
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Members List</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 32px; color: #1c3a3a; }
        .header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; border-bottom: 2px solid #e5e7eb; padding-bottom: 16px; }
        .header h1 { font-size: 20px; font-weight: 700; }
        .header p { font-size: 12px; color: #9ca3af; margin-top: 4px; }
        .meta { font-size: 12px; color: #9ca3af; text-align: right; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        thead tr { background: #1c9097; color: white; }
        thead th { padding: 10px 12px; text-align: left; font-weight: 600; font-size: 12px; letter-spacing: 0.04em; }
        tbody tr { border-bottom: 1px solid #f0f0f0; }
        tbody tr:nth-child(even) { background: #f7fafa; }
        tbody td { padding: 9px 12px; vertical-align: middle; }
        @media print {
          body { padding: 20px; }
          @page { margin: 1cm; size: A4 landscape; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>Members List</h1>
          <p>${members.length} members · Exported ${new Date().toLocaleDateString("en-KE", { dateStyle: "long" })}</p>
        </div>
        <div class="meta">JKUAT CATCOM</div>
      </div>
      <table>
        <thead>
          <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </body>
    </html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 400);
};

const MemberManager = ({
  members,
  addMember,
  removeMember,
  updateMember,
  toggleSession,
  groupType,
}) => {
  const isSCC = groupType === "scc";

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const handleRemove = async (id) => {
    if (confirmId === id) {
      try {
        setRemovingId(id);
        await removeMember(id);
      } finally {
        setRemovingId(null);
        setConfirmId(null);
      }
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? m.role === filterRole : true;
    return matchesName && matchesRole;
  });

  const inSessionCount = members.filter((m) => m.inSession !== false).length;

  return (
    <div className={styles.card}>
      <div className={`${styles.section} ${styles.sectionMembers}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <FaUsers size={14} />
          </div>
          <div className={styles.sectionHeaderText}>
            <h3 className={styles.sectionTitle}>Members</h3>
            <p className={styles.sectionSub}>
              {inSessionCount} in session · {members.length} total
            </p>
          </div>
          <div className={styles.exportBtns}>
            <button
              className={styles.exportBtn}
              onClick={() => exportCSV(members, isSCC)}
              title="Download CSV"
            >
              <FaFileCsv size={13} /> CSV
            </button>
            <button
              className={styles.exportBtn}
              onClick={() => exportPDF(members, isSCC)}
              title="Print / Save as PDF"
            >
              <FaFilePdf size={13} /> PDF
            </button>
          </div>
        </div>

        <MemberSearch
          search={search}
          filterRole={filterRole}
          onSearchChange={setSearch}
          onFilterChange={setFilterRole}
        />

        <div className={styles.list}>
          {filteredMembers.length === 0 && (
            <p className={styles.empty}>No members found.</p>
          )}
          {filteredMembers.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              isSCC={isSCC}
              confirmId={confirmId}
              removingId={removingId}
              onEdit={setEditTarget}
              onRemove={handleRemove}
              onToggleSession={toggleSession}
            />
          ))}
        </div>
      </div>

      <div className={`${styles.section} ${styles.sectionAdd}`}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionIcon} ${styles.sectionIconAlt}`}>
            <FaUserAlt size={13} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Add Member</h3>
            <p className={styles.sectionSub}>Fill in the details below</p>
          </div>
        </div>

        <AddMemberForm onAdd={addMember} isSCC={isSCC} />
      </div>

      {editTarget && (
        <EditMemberModal
          member={editTarget}
          isSCC={isSCC}
          onSave={updateMember}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
};

export default MemberManager;
