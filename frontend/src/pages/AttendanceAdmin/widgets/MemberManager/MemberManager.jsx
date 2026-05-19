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
  const colWidths = isSCC ? [160, 110, 110, 110, 90] : [180, 120, 130, 100];
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

  const totalWidth = colWidths.reduce((a, b) => a + b, 0) + 80;
  const rowHeight = 28;
  const headerHeight = 36;
  const topPad = 60;
  const pageHeight = topPad + headerHeight + rows.length * rowHeight + 60;

  const escXml = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  let headerCells = "";
  let x = 40;
  headers.forEach((h, i) => {
    headerCells += `<rect x="${x}" y="${topPad}" width="${colWidths[i]}" height="${headerHeight}" fill="#1c9097"/>`;
    headerCells += `<text x="${x + 10}" y="${topPad + 23}" font-family="Arial" font-size="12" font-weight="bold" fill="white">${escXml(h)}</text>`;
    x += colWidths[i];
  });

  let dataCells = "";
  rows.forEach((row, ri) => {
    const y = topPad + headerHeight + ri * rowHeight;
    const bg = ri % 2 === 0 ? "#f7fafa" : "#ffffff";
    dataCells += `<rect x="40" y="${y}" width="${totalWidth - 80}" height="${rowHeight}" fill="${bg}"/>`;
    let cx = 40;
    row.forEach((val, ci) => {
      const isStatus = ci === row.length - 1;
      const color = isStatus
        ? val === "In Session"
          ? "#065f46"
          : "#9b4444"
        : "#1c3a3a";
      dataCells += `<text x="${cx + 10}" y="${y + 18}" font-family="Arial" font-size="11" fill="${color}">${escXml(val)}</text>`;
      cx += colWidths[ci];
    });
    dataCells += `<line x1="40" y1="${y + rowHeight}" x2="${totalWidth - 40}" y2="${y + rowHeight}" stroke="#e5e7eb" stroke-width="0.5"/>`;
  });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${pageHeight}">
  <rect width="${totalWidth}" height="${pageHeight}" fill="white"/>
  <text x="40" y="36" font-family="Arial" font-size="16" font-weight="bold" fill="#1c3a3a">Members List</text>
  <text x="${totalWidth - 40}" y="36" font-family="Arial" font-size="11" fill="#9ca3af" text-anchor="end">${rows.length} members · ${new Date().toLocaleDateString("en-KE")}</text>
  ${headerCells}
  ${dataCells}
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "members.svg";
  a.click();
  URL.revokeObjectURL(url);
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
              title="Download PDF"
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
