import React, { useState, useEffect, useCallback } from "react";
import styles from "./AttendanceTable.module.css";
import { isLocked } from "@/utils/attendanceLock";
import { exportSingleCSV, exportSinglePDF } from "./utils/attendanceExport";
import {
  fetchMeetingPurpose,
  saveMeetingPurpose,
  fetchVisitorsByDate,
  createVisitor,
  deleteVisitor,
} from "@/api/attendance.api";

import {
  VisitorLog,
  TableToolbar,
  AttendanceRow,
  RangeReportModal,
} from "@/pages/AttendanceAdmin/widgets/AttendanceTable/widgets";

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
  const [visitors, setVisitors] = useState([]);

  const locked = isLocked(meetingDate);
  const roles = [...new Set(members.map((m) => m.role))];
  const purposeFilled = !!meetingPurpose.trim();

  useEffect(() => {
    if (!meetingDate) return;
    setMeetingPurpose("");
    setMeetingActivities("");
    setPurposeSaved(false);
    setVisitors([]);

    fetchMeetingPurpose(meetingDate)
      .then((data) => {
        if (data?.purpose) {
          setMeetingPurpose(data.purpose);
          setPurposeSaved(true);
        }
        if (data?.activities) setMeetingActivities(data.activities);
      })
      .catch(() => {});

    fetchVisitorsByDate(meetingDate)
      .then(setVisitors)
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
  const handleAddVisitor = async ({ name, phone, type }) => {
    const saved = await createVisitor({ date: meetingDate, name, phone, type });
    setVisitors((prev) => [...prev, saved]);
  };

  const handleRemoveVisitor = async (id) => {
    await deleteVisitor(id);
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };

  const handleUpdateAttendance = (id, status) => {
    if (!purposeFilled) return;
    updateAttendance(id, status);
  };

  const filteredMembers = members
    .filter((m) => {
      const matchName = m.name.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter ? m.role === roleFilter : true;
      const matchFamily = familyFilter
        ? (m.family_name || "")
            .toLowerCase()
            .includes(familyFilter.toLowerCase())
        : true;
      return matchName && matchRole && matchFamily;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

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
            visitors,
          )
        }
        onDownloadPDF={() =>
          exportSinglePDF(
            filteredMembers,
            groupName,
            meetingDate,
            meetingPurpose,
            meetingActivities,
            visitors,
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

      {purposeFilled && (
        <VisitorLog
          visitors={visitors}
          onAdd={handleAddVisitor}
          onRemove={handleRemoveVisitor}
        />
      )}

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
