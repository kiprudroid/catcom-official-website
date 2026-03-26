import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AttendanceAdmin.module.css";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

// import AttendanceWidgets from "./widgets/AttendanceWidgets/AttendanceWidgets";
// import AttendanceChart from "./widgets/AttendanceChart/AttendanceChart";
// import MeetingSelector from "./widgets/MeetingSelector/MeetingSelector";
// import MembersAtRisk from "./widgets/MembersAtRisk/MembersAtRisk";
// import MemberManager from "./widgets/MemberManager/MemberManager";
// import AttendanceTable from "./widgets/AttendanceTable/AttendanceTable";
// import Spinner from "./widgets/Spinner/Spinner";
// import SaveButton from "./widgets/SaveButton/SaveButton";

import {
  AttendanceChart,
  AttendanceWidgets,
  MeetingSelector,
  MembersAtRisk,
  MemberManager,
  AttendanceTable,
  Spinner,
  SaveButton,
} from "@/pages/AttendanceAdmin/widgets";

import {
  fetchMembers,
  fetchAttendanceByDate,
  createMember,
  deleteMember,
  markAttendance,
} from "@/api/attendance.api";

const AttendanceAdmin = () => {
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [meetingDate, setMeetingDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const navigate = useNavigate();

  // Read group info from localStorage (set on login)
  const group = JSON.parse(localStorage.getItem("attendance_group") || "{}");

  const loadMembers = useCallback(async () => {
    try {
      const data = await fetchMembers();
      setMembers(data.filter((m) => m.status === "active"));
    } catch {
      toast.error("Failed to load members");
    }
  }, []);

  const loadAttendance = useCallback(async (date) => {
    try {
      const data = await fetchAttendanceByDate(date);
      const map = {};
      data.forEach((a) => {
        map[a.member_id] = a.status;
      });
      setAttendance(map);
    } catch {
      toast.error("Failed to load attendance");
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadMembers();
      await loadAttendance(meetingDate);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!loading) loadAttendance(meetingDate);
  }, [meetingDate]);

  const membersWithAttendance = members.map((m) => ({
    ...m,
    attendance: attendance[m.id] || "present",
    consecutiveAbsence: Number(m.consecutive_absences) || 0,
  }));

  const updateAttendance = (memberId, status) => {
    setAttendance((prev) => ({ ...prev, [memberId]: status }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        members.map((m) =>
          markAttendance({
            member_id: m.id,
            date: meetingDate,
            status: attendance[m.id] || "present",
          }),
        ),
      );
      toast.success("Attendance saved");
    } catch {
      toast.error("Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  const handleAddMember = async ({ name, role }) => {
    try {
      const newMember = await createMember({ name, role });
      setMembers((prev) => [...prev, newMember]);
      toast.success(`${name} added`);
    } catch {
      toast.error("Failed to add member");
    }
  };

  const handleRemoveMember = async (id) => {
    try {
      await deleteMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success("Member removed");
    } catch {
      toast.error("Failed to remove member");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("attendance_token");
    localStorage.removeItem("attendance_group");
    navigate("/attendance-login", { replace: true });
    toast.success("Signed out");
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>JKUAT CATCOM</span>
          <h1 className={styles.title}>{group.name || "Group"} Attendance</h1>
          {group.type && <span className={styles.typeBadge}>{group.type}</span>}
        </div>
        <div className={styles.topActions}>
          <MeetingSelector
            meetingDate={meetingDate}
            setMeetingDate={setMeetingDate}
          />
          <SaveButton onClick={handleSave} loading={saving} />
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      <AttendanceWidgets members={membersWithAttendance} />
      <MembersAtRisk members={membersWithAttendance} />

      <div className={styles.splitRow}>
        <AttendanceChart members={membersWithAttendance} />
        <MemberManager
          members={members}
          addMember={handleAddMember}
          removeMember={handleRemoveMember}
        />
      </div>

      <AttendanceTable
        members={membersWithAttendance}
        updateAttendance={updateAttendance}
      />
    </div>
  );
};

export default AttendanceAdmin;
