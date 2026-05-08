import React, { useState } from "react";
import MemberAvatar from "../MemberAvatar/MemberAvatar";
import styles from "./EditMemberModal.module.css";

const ROLES = [
  "Catering Secretary",
  "Chairperson",
  "Coordinator",
  "Liturgist",
  "Member",
  "Moderator",
  "Organising Secretary",
  "Pastoral Secretary",
  "Project Manager",
  "Secretary",
  "Treasurer",
].sort();

const sanitizePhone = (val) =>
  String(val ?? "")
    .replace(/\D/g, "")
    .slice(0, 10);

const KENYAN_PHONE = /^(07[0-9]\d{7}|01[01][0-9]\d{6})$/;
const isValidPhone = (phone) => !phone || KENYAN_PHONE.test(phone);

const EditMemberModal = ({ member, isSCC, onSave, onClose }) => {
  const [editName, setEditName] = useState(member.name);
  const [editPhone, setEditPhone] = useState(sanitizePhone(member.phone));
  const [editRole, setEditRole] = useState(
    ROLES.includes(member.role) ? member.role : "custom",
  );
  const [editCustomRole, setEditCustomRole] = useState(
    ROLES.includes(member.role) ? "" : member.role,
  );
  const [editFamilyName, setEditFamilyName] = useState(
    member.family_name || "",
  );
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalRole = editRole === "custom" ? editCustomRole.trim() : editRole;
    if (!editName.trim() || !finalRole) return;
    if (!isValidPhone(editPhone)) {
      alert("Enter a valid Kenyan number (e.g. 07XXXXXXXX or 0117XXXXXX)");
      return;
    }
    try {
      setUpdating(true);
      await onSave(member.id, {
        name: editName.trim(),
        phone: sanitizePhone(editPhone),
        role: finalRole,
        family_name: isSCC ? editFamilyName.trim() || null : undefined,
      });
      onClose();
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <MemberAvatar name={member.name} size={36} fontSize={14} />
          <div>
            <h4 className={styles.modalTitle}>Edit Member</h4>
            <p className={styles.modalSub}>{member.name}</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                className={styles.input}
                placeholder="Full name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Phone Number</label>
              <input
                className={styles.input}
                placeholder="07XXXXXXXX or 011XXXXXXX"
                value={editPhone}
                onChange={(e) => setEditPhone(sanitizePhone(e.target.value))}
                onPaste={(e) => {
                  e.preventDefault();
                  setEditPhone(sanitizePhone(e.clipboardData.getData("text")));
                }}
                inputMode="numeric"
                maxLength={10}
              />
            </div>
            {isSCC && (
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Family Name</label>
                <input
                  className={styles.input}
                  placeholder="Optional"
                  value={editFamilyName}
                  onChange={(e) => setEditFamilyName(e.target.value)}
                />
              </div>
            )}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Role *</label>
              <select
                className={styles.select}
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
                <option value="custom">Other…</option>
              </select>
            </div>
            {editRole === "custom" && (
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Custom Role *</label>
                <input
                  className={styles.input}
                  placeholder="Enter role title"
                  value={editCustomRole}
                  onChange={(e) => setEditCustomRole(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={updating}
            >
              {updating ? <span className={styles.spinner} /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
