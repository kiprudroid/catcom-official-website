import React, { useState } from "react";
import { FaEdit, FaTrash, FaClock } from "react-icons/fa";
import MemberAvatar from "../MemberAvatar/MemberAvatar";
import styles from "./MemberRow.module.css";

const MemberRow = ({
  member,
  isSCC,
  confirmId,
  removingId,
  onEdit,
  onRemove,
  onToggleSession,
}) => {
  const inSession = member.inSession !== false;
  const [togglingSession, setTogglingSession] = useState(false);

  const handleToggleSession = async () => {
    try {
      setTogglingSession(true);
      await onToggleSession(member.id, !inSession);
    } finally {
      setTogglingSession(false);
    }
  };

  return (
    <div
      className={`${styles.memberRow} ${!inSession ? styles.outOfSession : ""}`}
    >
      <MemberAvatar name={member.name} />

      <div className={styles.memberInfo}>
        <div className={styles.memberNameRow}>
          <span className={styles.memberName}>{member.name}</span>
        </div>

        <div className={styles.memberMeta}>
          {member.phone && (
            <span className={styles.memberPhone}>{member.phone}</span>
          )}
          <span className={styles.rolePill}>
            {member.role}
            {isSCC && member.family_name ? ` · ${member.family_name}` : ""}
          </span>
        </div>

        {member.createdAt && (
          <div className={styles.memberTimestamp}>
            <FaClock size={10} />
            <span>
              Added on{" "}
              {new Date(member.createdAt).toLocaleDateString("en-KE", {
                dateStyle: "medium",
              })}{" "}
              at{" "}
              {new Date(member.createdAt).toLocaleTimeString("en-KE", {
                timeStyle: "short",
              })}
            </span>
          </div>
        )}
      </div>

      <div className={styles.rowActions}>
        <button
          className={`${styles.sessionToggle} ${inSession ? styles.sessionOn : styles.sessionOff}`}
          onClick={handleToggleSession}
          disabled={togglingSession || removingId === member.id}
          title={inSession ? "Mark as on break" : "Mark as back in session"}
        >
          {togglingSession ? (
            <span className={styles.sessionSpinner} />
          ) : inSession ? (
            "In Session"
          ) : (
            "On Break"
          )}
        </button>
        <button
          className={styles.editBtn}
          onClick={() => onEdit(member)}
          disabled={togglingSession || removingId === member.id}
          title="Edit member"
        >
          <FaEdit />
        </button>
        <button
          className={`${styles.removeBtn} ${confirmId === member.id ? styles.confirm : ""}`}
          onClick={() => onRemove(member.id)}
          disabled={togglingSession || removingId === member.id}
          title={
            confirmId === member.id ? "Click again to confirm" : "Remove member"
          }
        >
          {removingId === member.id ? (
            <span className={styles.spinner} />
          ) : (
            <>
              <FaTrash />
              {confirmId === member.id && <span> Confirm?</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MemberRow;
