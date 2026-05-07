import { useState, useEffect, useMemo } from "react";
import styles from "./JoinGroup.module.css";
import { fetchJoinGroups, deleteJoinGroup } from "@/api/joinGroup.api";
import {
  Toolbar,
  PageHeader,
  MemberTable,
  MemberModal,
  ExportModal,
} from "@/pages/AdminPanel/pages/JoinGroup/widgets";

const PENDING_PREFIX = "PENDING: ";
const isPending = (v) => typeof v === "string" && v.startsWith(PENDING_PREFIX);

function JoinGroup() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exportGroup, setExportGroup] = useState("all");
  const [exportRange, setExportRange] = useState("all");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJoinGroups();
      setSubmissions(data);
    } catch (err) {
      setError("Failed to load submissions: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const approved = useMemo(
    () => submissions.filter((s) => !isPending(s.group_joined)),
    [submissions],
  );

  const allGroups = useMemo(() => {
    const groups = new Set();
    approved.forEach((s) => {
      s.group_joined?.split(",").forEach((g) => groups.add(g.trim()));
    });
    return [...groups].sort();
  }, [approved]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return approved.filter((s) => {
      const matchSearch =
        s.full_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.college.toLowerCase().includes(q) ||
        s.group_joined.toLowerCase().includes(q);
      const matchGroup =
        groupFilter === "all" ||
        s.group_joined
          ?.split(",")
          .map((g) => g.trim())
          .includes(groupFilter);
      return matchSearch && matchGroup;
    });
  }, [search, groupFilter, approved]);

  const getExportRows = () => {
    let rows = [...approved];
    if (exportGroup !== "all") {
      rows = rows.filter((r) =>
        r.group_joined
          ?.split(",")
          .map((g) => g.trim())
          .includes(exportGroup),
      );
    }
    if (exportRange !== "all") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - Number(exportRange));
      rows = rows.filter((r) =>
        r.created_at ? new Date(r.created_at) >= cutoff : true,
      );
    }
    return rows;
  };

  const handleCopyDetails = (s) => {
    const text = `Name: ${s.full_name}\nPhone: ${s.phone_number}\nEmail: ${s.email}\nGender: ${s.gender}\nCollege: ${s.college}\nGroup(s): ${s.group_joined}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleConfirmDelete = async (id) => {
    setDeletingId(id);
    setConfirmId(null);
    try {
      await deleteJoinGroup(id);
      setSubmissions((prev) => prev.filter((s) => s.user_id !== id));
      if (selectedMember?.user_id === id) setSelectedMember(null);
    } catch (err) {
      setError("Failed to delete: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadPdf = () => {
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
        <td>${r.email}</td><td>${r.gender}</td><td>${r.college}</td><td>${r.group_joined}</td>
      </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Group Members Export</title>
<style>
  body{font-family:Arial,sans-serif;padding:32px;color:#1a1a1a}
  h1{font-size:20px;margin-bottom:4px}
  .meta{font-size:12px;color:#666;margin-bottom:24px}
  table{width:100%;border-collapse:collapse;font-size:12px}
  th{background:#111827;color:#fff;padding:8px 10px;text-align:left}
  td{padding:7px 10px;border-bottom:1px solid #e5e7eb}
  tr:nth-child(even) td{background:#f9fafb}
  .footer{margin-top:24px;font-size:11px;color:#9ca3af}
</style></head><body>
<h1>CATCOM – Approved Group Members</h1>
<p class="meta">Generated: ${dateStr} | Group: ${exportGroup === "all" ? "All Groups" : exportGroup} | Period: ${exportRange === "all" ? "All time" : `Last ${exportRange} days`} | Total: ${rows.length}</p>
<table><thead><tr><th>#</th><th>Full Name</th><th>Phone</th><th>Email</th><th>Gender</th><th>College</th><th>Group(s)</th></tr></thead>
<tbody>${tableRows}</tbody></table>
<p class="footer">CATCOM Admin Panel · JKUAT</p>
<script>window.onload=()=>window.print()<\/script>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (!win) alert("Allow popups to export the PDF.");
    setShowExport(false);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        onExport={() => setShowExport(true)}
        onRefresh={loadSubmissions}
      />

      <Toolbar
        search={search}
        onSearch={setSearch}
        groupFilter={groupFilter}
        onGroupFilter={setGroupFilter}
        allGroups={allGroups}
        filteredCount={filtered.length}
        totalCount={approved.length}
      />

      {loading && (
        <div className={styles.stateMsg}>
          <div className={styles.spinner} /> Loading…
        </div>
      )}

      {error && <div className={styles.errorMsg}>⚠ {error}</div>}

      {!loading && !error && (
        <MemberTable
          members={filtered}
          deletingId={deletingId}
          confirmId={confirmId}
          onSelectMember={(s) => {
            setSelectedMember(s);
            setCopied(false);
          }}
          onDeleteClick={(id) => setConfirmId(id)}
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={() => setConfirmId(null)}
        />
      )}

      <MemberModal
        member={selectedMember}
        copied={copied}
        onClose={() => setSelectedMember(null)}
        onCopy={handleCopyDetails}
      />

      {showExport && (
        <ExportModal
          allGroups={allGroups}
          exportGroup={exportGroup}
          exportRange={exportRange}
          exportCount={getExportRows().length}
          onGroupChange={setExportGroup}
          onRangeChange={setExportRange}
          onClose={() => setShowExport(false)}
          onDownload={handleDownloadPdf}
        />
      )}
    </div>
  );
}

export default JoinGroup;
