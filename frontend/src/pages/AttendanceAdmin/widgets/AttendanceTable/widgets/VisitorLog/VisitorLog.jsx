import React, { useState } from "react";
import { FaUserClock, FaPlus, FaTrash } from "react-icons/fa";
import styles from "./VisitorLog.module.css";

const sanitizePhone = (val) =>
  String(val ?? "")
    .replace(/\D/g, "")
    .slice(0, 10);

const VisitorLog = ({ visitors, onAdd, onRemove }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("visitor");
  const [adding, setAdding] = useState(false);

  // confirmId = id of visitor awaiting confirmation
  // deletingId = id currently being deleted (spinner shown)
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      setAdding(true);
      await onAdd({ name: trimmed, phone: sanitizePhone(phone), type });
      setName("");
      setPhone("");
      setType("visitor");
    } finally {
      setAdding(false);
    }
  };

  const handleRequestDelete = (id) => {
    setConfirmId(id);
  };

  const handleCancelDelete = () => {
    setConfirmId(null);
  };

  const handleConfirmDelete = async (id) => {
    try {
      setConfirmId(null);
      setDeletingId(id);
      await onRemove(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.container}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className={styles.header}>
        <FaUserClock className={styles.icon} />
        <span className={styles.title}>Visitors &amp; Alumni</span>
        <span className={styles.badge}>{visitors.length}</span>
      </div>

      <p className={styles.hint}>
        Recorded for this meeting date only — not added as permanent members.
      </p>

      {/* ── Input row ──────────────────────────────────────────── */}
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          placeholder="Full name of visitor / alumni"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <input
          className={styles.input}
          placeholder="Phone e.g. 07XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(sanitizePhone(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          inputMode="numeric"
          maxLength={10}
        />
        <select
          className={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="visitor">Visitor</option>
          <option value="alumni">Alumni</option>
        </select>
        <button
          className={styles.addBtn}
          onClick={handleAdd}
          disabled={!name.trim() || adding}
        >
          {adding ? <span className={styles.spinner} /> : <FaPlus size={11} />}
          {adding ? "Adding…" : "Add"}
        </button>
      </div>

      {/* ── Visitor list ───────────────────────────────────────── */}
      {visitors.length > 0 && (
        <ul className={styles.list}>
          {visitors.map((v) => {
            const isConfirming = confirmId === v.id;
            const isDeleting = deletingId === v.id;

            return (
              <li
                key={v.id}
                className={`${styles.item} ${isConfirming ? styles.confirming : ""}`}
              >
                {/* Name */}
                <span className={styles.visitorName}>{v.name}</span>

                {/* Phone */}
                {v.phone && (
                  <span className={styles.visitorPhone}>{v.phone}</span>
                )}

                {/* Type badge */}
                <span
                  className={`${styles.visitorTag} ${
                    v.type === "alumni" ? styles.tagAlumni : styles.tagVisitor
                  }`}
                >
                  {v.type === "alumni" ? "Alumni" : "Visitor"}
                </span>

                {/* Delete / confirm controls */}
                {isDeleting ? (
                  <span className={styles.spinnerSm} />
                ) : isConfirming ? (
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Remove?</span>
                    <button
                      className={styles.confirmYes}
                      onClick={() => handleConfirmDelete(v.id)}
                    >
                      Yes
                    </button>
                    <button
                      className={styles.confirmNo}
                      onClick={handleCancelDelete}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRequestDelete(v.id)}
                    title="Remove visitor"
                  >
                    <FaTrash size={11} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default VisitorLog;
