import React, { useState, useEffect, useCallback } from "react";
import styles from "./AttendanceTable.module.css";
import { isLocked } from "@/utils/attendanceLock";
import { exportSingleCSV, exportSinglePDF } from "./utils/attendanceExport";
import { fetchMeetingPurpose, saveMeetingPurpose } from "@/api/attendance.api";
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
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [meetingActivities, setMeetingActivities] = useState("");
  const [purposeSaved, setPurposeSaved] = useState(false);
  const [saveTimer, setSaveTimer] = useState(null);

  const locked = isLocked(meetingDate);
  const roles = [...new Set(members.map((m) => m.role))];
  const purposeFilled = !!meetingPurpose.trim();

  useEffect(() => {
    if (!meetingDate) return;
    setMeetingPurpose("");
    setMeetingActivities("");
    setPurposeSaved(false);
    fetchMeetingPurpose(meetingDate)
      .then((data) => {
        if (data?.purpose) {
          setMeetingPurpose(data.purpose);
          setPurposeSaved(true);
        }
        if (data?.activities) setMeetingActivities(data.activities);
      })
      .catch(() => {});
  }, [meetingDate]);

  const persistPurpose = useCallback(
    (purpose, activities) => {
      if (!meetingDate || !purpose.trim()) return;
      if (saveTimer) clearTimeout(saveTimer);
      const t = setTimeout(async () => {
        try {
          await saveMeetingPurpose({ date: meetingDate, purpose, activities });
          setPurposeSaved(true);
        } catch {}
      }, 800);
      setSaveTimer(t);
    },
    [meetingDate, saveTimer],
  );

  const handlePurposeChange = (val) => {
    setMeetingPurpose(val);
    setPurposeSaved(false);
    persistPurpose(val, meetingActivities);
  };

  const handleActivitiesChange = (val) => {
    setMeetingActivities(val);
    setPurposeSaved(false);
    persistPurpose(meetingPurpose, val);
  };

  const handleUpdateAttendance = (id, status) => {
    if (!purposeFilled) return;
    updateAttendance(id, status);
  };

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
          exportSingleCSV(
            filteredMembers,
            groupName,
            meetingDate,
            meetingPurpose,
            meetingActivities,
          )
        }
        onDownloadPDF={() =>
          exportSinglePDF(
            filteredMembers,
            groupName,
            meetingDate,
            meetingPurpose,
            meetingActivities,
          )
        }
        onShowRange={() => setShowRange(true)}
        locked={locked}
        groupName={groupName}
        meetingDate={meetingDate}
        familyFilter={familyFilter}
        onFamilyFilterChange={setFamilyFilter}
        groupType={groupType}
        meetingPurpose={meetingPurpose}
        onMeetingPurposeChange={handlePurposeChange}
        meetingActivities={meetingActivities}
        onMeetingActivitiesChange={handleActivitiesChange}
        purposeSaved={purposeSaved}
      />

      {!purposeFilled && !locked && (
        <div className={styles.purposeGate}>
          ☝ Fill in the <strong>Purpose of Meeting</strong> above before marking
          attendance.
        </div>
      )}

      <div
        className={`${styles.tableScroll} ${!purposeFilled && !locked ? styles.tableBlurred : ""}`}
      >
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
                locked={locked || !purposeFilled}
                meetingDate={meetingDate}
                copiedId={copiedId}
                onCopyPhone={copyPhone}
                onUpdateAttendance={handleUpdateAttendance}
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
