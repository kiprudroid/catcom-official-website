import React, { useState } from "react";
import { FaEdit, FaTrash, FaClock } from "react-icons/fa";
import MemberAvatar, { avatarColor } from "../MemberAvatar/MemberAvatar";
import styles from "./MemberRow.module.css";

function MemberDetailModal({ member, isSCC, onClose }) {
  const [copied, setCopied] = useState(false);

  const lines = [
    `Name: ${member.name}`,
    member.phone ? `Phone: ${member.phone}` : null,
    `Role: ${member.role}`,
    isSCC && member.family_name ? `Family: ${member.family_name}` : null,
    `Status: ${member.inSession !== false ? "In Session" : "On Break"}`,
  ].filter(Boolean);

  const handleCopy = () => {
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.detailOverlay} onClick={onClose}>
      <div className={styles.detailBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.detailClose} onClick={onClose}>
          ✕
        </button>

        <div className={styles.detailAvatar}>
          <MemberAvatar name={member.name} size={64} fontSize={22} />
        </div>

        <p className={styles.detailName}>{member.name}</p>

        {isSCC && member.family_name && (
          <span className={styles.detailBadge}>{member.family_name}</span>
        )}

        <div className={styles.detailFields}>
          {member.phone && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>PHONE</span>
              <span
                className={styles.detailValue}
                style={{ color: avatarColor(member.name) }}
              >
                {member.phone}
              </span>
            </div>
          )}
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>ROLE</span>
            <span className={styles.detailValue}>{member.role}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>STATUS</span>
            <span className={styles.detailValue}>
              {member.inSession !== false ? "In Session" : "On Break"}
            </span>
          </div>
          {member.createdAt && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ADDED</span>
              <span className={styles.detailValue}>
                {new Date(member.createdAt).toLocaleDateString("en-KE", {
                  dateStyle: "medium",
                })}
              </span>
            </div>
          )}
        </div>

        <button className={styles.detailCopyBtn} onClick={handleCopy}>
          {copied ? "✓ Copied!" : "📋 Copy All Details"}
        </button>
      </div>
    </div>
  );
}

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
  const [showDetail, setShowDetail] = useState(false);

  const handleToggleSession = async () => {
    try {
      setTogglingSession(true);
      await onToggleSession(member.id, !inSession);
    } finally {
      setTogglingSession(false);
    }
  };

  return (
    <>
      {showDetail && (
        <MemberDetailModal
          member={member}
          isSCC={isSCC}
          onClose={() => setShowDetail(false)}
        />
      )}

      <div
        className={`${styles.memberRow} ${!inSession ? styles.outOfSession : ""}`}
      >
        <MemberAvatar name={member.name} onClick={() => setShowDetail(true)} />

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
              confirmId === member.id
                ? "Click again to confirm"
                : "Remove member"
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
    </>
  );
};

export default MemberRow;
