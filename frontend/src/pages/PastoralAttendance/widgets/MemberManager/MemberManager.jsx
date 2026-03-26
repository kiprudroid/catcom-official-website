import React, { useState } from "react";
import styles from "./MemberManager.module.css";
import { FaPlus, FaTrash, FaUserAlt } from "react-icons/fa";

const ROLES = [
  "Coordinator",
  "Secretary",
  "Treasurer",
  "Liturgy",
  "Hospitality",
  "Social",
  "Publicity",
  "Member",
];

const MemberManager = ({ members, addMember, removeMember }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRole = role === "custom" ? customRole.trim() : role;
    if (!name.trim() || !finalRole) return;
    addMember({ name: name.trim(), role: finalRole });
    setName("");
    setRole("");
    setCustomRole("");
  };

  const handleRemove = (id) => {
    if (confirmId === id) {
      removeMember(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Manage Members</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <input
            className={styles.input}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select role
            </option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
            <option value="custom">Other…</option>
          </select>
          {role === "custom" && (
            <input
              className={styles.input}
              placeholder="Enter role"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              required
            />
          )}
        </div>
        <button type="submit" className={styles.addBtn}>
          <FaPlus /> Add Member
        </button>
      </form>

      <div className={styles.list}>
        {members.length === 0 && (
          <p className={styles.empty}>No members added yet.</p>
        )}
        {members.map((m) => (
          <div key={m.id} className={styles.memberRow}>
            <FaUserAlt className={styles.userIcon} />
            <div className={styles.memberInfo}>
              <span className={styles.memberName}>{m.name}</span>
              <span className={styles.memberRole}>{m.role}</span>
            </div>
            <button
              className={`${styles.removeBtn} ${confirmId === m.id ? styles.confirm : ""}`}
              onClick={() => handleRemove(m.id)}
              title={
                confirmId === m.id ? "Click again to confirm" : "Remove member"
              }
            >
              <FaTrash />
              {confirmId === m.id ? " Confirm?" : ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberManager;
