import React, { useState } from "react";
import styles from "./AttendanceTable.module.css";
import { isLocked } from "@/utils/attendanceLock";
import { exportSingleCSV, exportSinglePDF } from "./utils/attendanceExport";
import RangeReportModal from "./widgets/RangeReportModal";
import TableToolbar from "./widgets/TableToolbar";
import AttendanceRow from "./widgets/AttendanceRow";

const AttendanceTable = ({
  members,
  updateAttendance,
  meetingDate,
  groupName,
  groupType,
}) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [familyFilter, setFamilyFilter] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [showRange, setShowRange] = useState(false);

  const locked = isLocked(meetingDate);
  const roles = [...new Set(members.map((m) => m.role))];

  const filteredMembers = members.filter((m) => {
    const matchName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? m.role === roleFilter : true;
    const matchFamily = familyFilter
      ? (m.family_name || "").toLowerCase().includes(familyFilter.toLowerCase())
      : true;
    return matchName && matchRole && matchFamily;
  });

  const copyPhone = (id, phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    });
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
      {showRange && (
        <RangeReportModal
          groupName={groupName}
          onClose={() => setShowRange(false)}
        />
      )}

      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        roles={roles}
        onDownloadCSV={() =>
          exportSingleCSV(filteredMembers, groupName, meetingDate)
        }
        onDownloadPDF={() =>
          exportSinglePDF(filteredMembers, groupName, meetingDate)
        }
        onShowRange={() => setShowRange(true)}
        locked={locked}
        groupName={groupName}
        meetingDate={meetingDate}
        familyFilter={familyFilter}
        onFamilyFilterChange={setFamilyFilter}
        groupType={groupType}
      />

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.thIdx}>#</th>
              <th className={styles.thName}>Name</th>
              <th className={styles.thMark}>Mark Attendance</th>
              <th className={styles.thPhone}>Phone</th>
              <th className={styles.thRole}>Role</th>
              {groupType === "scc" && (
                <th className={styles.thFamily}>Family</th>
              )}
              <th className={styles.thStatus}>Status</th>
              <th className={styles.thAbs}>Consecutive Absences</th>
              <th className={styles.thRecent}>Absences in Last 60 Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, idx) => (
              <AttendanceRow
                key={member.id}
                member={member}
                idx={idx}
                locked={locked}
                meetingDate={meetingDate}
                copiedId={copiedId}
                onCopyPhone={copyPhone}
                onUpdateAttendance={updateAttendance}
                groupType={groupType}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
