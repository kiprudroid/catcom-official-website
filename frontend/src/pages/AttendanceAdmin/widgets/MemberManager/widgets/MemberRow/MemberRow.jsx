import React from "react";
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
}) => (
  <div className={styles.memberRow}>
    <MemberAvatar name={member.name} />
    <div className={styles.memberInfo}>
      <span className={styles.memberName}>{member.name}</span>
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
            Added{" "}
            {new Date(member.createdAt).toLocaleString("en-KE", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      )}
    </div>
    <div className={styles.rowActions}>
      <button
        className={styles.editBtn}
        onClick={() => onEdit(member)}
        disabled={removingId === member.id}
        title="Edit member"
      >
        <FaEdit />
      </button>
      <button
        className={`${styles.removeBtn} ${confirmId === member.id ? styles.confirm : ""}`}
        onClick={() => onRemove(member.id)}
        disabled={removingId === member.id}
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

export default MemberRow;
