import React from "react";
import styles from "./GroupCard.module.css";
import {
  FaClipboardList,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaKey,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AdminAccountPanel from "../AdminAccountPanel/AdminAccountPanel";

const GroupCard = ({
  group,
  isExpanded,
  admin,
  adminForm,
  showPasswords,
  onExpand,
  onEdit,
  onDelete,
  onNavigate,
  onFormChange,
  onTogglePassword,
  onCreateAdmin,
  onUpdatePassword,
  onDeleteAdmin,
}) => (
  <div className={styles.card}>
    <div className={styles.row}>
      <div className={styles.icon}>
        <FaClipboardList />
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{group.name}</span>
        <div className={styles.meta}>
          <span className={`${styles.typePill} ${styles[group.type]}`}>
            {group.type}
          </span>
          <span className={styles.memberCount}>
            {group.member_count || 0} members
          </span>
          {group.admin_email && (
            <span className={styles.adminEmail}>{group.admin_email}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          title="Open attendance login"
          onClick={onNavigate}
        >
          <FaExternalLinkAlt />
        </button>
        <button
          className={styles.iconBtn}
          title="Edit group"
          onClick={() => onEdit(group)}
        >
          <FaEdit />
        </button>
        <button
          className={`${styles.iconBtn} ${styles.danger}`}
          title="Delete group"
          onClick={() => onDelete(group.id)}
        >
          <FaTrash />
        </button>
        <button
          className={`${styles.iconBtn} ${isExpanded ? styles.active : ""}`}
          title="Manage admin account"
          onClick={() => onExpand(group.id)}
        >
          <FaKey />
          {isExpanded ? (
            <FaChevronUp style={{ fontSize: 10 }} />
          ) : (
            <FaChevronDown style={{ fontSize: 10 }} />
          )}
        </button>
      </div>
    </div>

    {isExpanded && (
      <AdminAccountPanel
        groupId={group.id}
        admin={admin}
        adminForm={adminForm}
        showPasswords={showPasswords}
        onFormChange={onFormChange}
        onTogglePassword={onTogglePassword}
        onCreateAdmin={onCreateAdmin}
        onUpdatePassword={onUpdatePassword}
        onDeleteAdmin={onDeleteAdmin}
      />
    )}
  </div>
);

export default GroupCard;
