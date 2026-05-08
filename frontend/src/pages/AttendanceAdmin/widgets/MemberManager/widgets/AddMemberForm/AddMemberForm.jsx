import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./AddMemberForm.module.css";

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

const AddMemberForm = ({ onAdd, isSCC }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalRole = role === "custom" ? customRole.trim() : role;
    if (!name.trim() || !finalRole) return;
    if (!isValidPhone(phone)) {
      alert("Enter a valid Kenyan number (e.g. 07XXXXXXXX or 0117XXXXXX)");
      return;
    }
    try {
      setAdding(true);
      await onAdd({
        name: name.trim(),
        phone: sanitizePhone(phone),
        role: finalRole,
        family_name: isSCC ? familyName.trim() || null : null,
      });
      setName("");
      setPhone("");
      setRole("");
      setFamilyName("");
      setCustomRole("");
    } finally {
      setAdding(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Full Name *</label>
          <input
            className={styles.input}
            placeholder="e.g. Jane Wanjiku"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            className={styles.input}
            placeholder="07XXXXXXXX or 011XXXXXXX"
            value={phone}
            onChange={(e) => setPhone(sanitizePhone(e.target.value))}
            onPaste={(e) => {
              e.preventDefault();
              setPhone(sanitizePhone(e.clipboardData.getData("text")));
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
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
        )}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Role *</label>
          <select
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a role…
            </option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
            <option value="custom">Other…</option>
          </select>
        </div>
        {role === "custom" && (
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Custom Role *</label>
            <input
              className={styles.input}
              placeholder="Enter role title"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              required
            />
          </div>
        )}
      </div>

      <button className={styles.addBtn} disabled={adding}>
        {adding ? <span className={styles.spinner} /> : <FaPlus />}
        {adding ? "Adding…" : "Add Member"}
      </button>
    </form>
  );
};

export default AddMemberForm;
