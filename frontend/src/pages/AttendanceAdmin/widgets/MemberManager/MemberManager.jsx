import React, { useState } from "react";
import styles from "./MemberManager.module.css";
import { FaPlus, FaTrash, FaUserAlt, FaSearch, FaEdit } from "react-icons/fa";

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

// 07x + 7 digits = 10 total  (Safaricom, Airtel, Telkom)
// 010x + 6 digits = 10 total (Airtel)
// 011x + 6 digits = 10 total (Airtel/Telkom)
const KENYAN_PHONE = /^(07[0-9]\d{7}|01[01][0-9]\d{6})$/;

const isValidPhone = (phone) => {
  if (!phone) return true;
  return KENYAN_PHONE.test(phone);
};

const MemberManager = ({ members, addMember, removeMember, updateMember }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editCustomRole, setEditCustomRole] = useState("");

  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removingId, setRemovingId] = useState(null);

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
      await addMember({
        name: name.trim(),
        phone: sanitizePhone(phone),
        role: finalRole,
      });
      setName("");
      setPhone("");
      setRole("");
      setCustomRole("");
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (id) => {
    if (confirmId === id) {
      try {
        setRemovingId(id);
        await removeMember(id);
      } finally {
        setRemovingId(null);
        setConfirmId(null);
      }
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  const openEdit = (m) => {
    setEditTarget(m);
    setEditName(m.name);
    setEditPhone(sanitizePhone(m.phone));
    setEditRole(ROLES.includes(m.role) ? m.role : "custom");
    setEditCustomRole(ROLES.includes(m.role) ? "" : m.role);
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const finalRole = editRole === "custom" ? editCustomRole.trim() : editRole;
    if (!editName.trim() || !finalRole) return;
    if (!isValidPhone(editPhone)) {
      alert("Enter a valid Kenyan number (e.g. 07XXXXXXXX or 0117XXXXXX)");
      return;
    }
    try {
      setUpdating(true);
      await updateMember(editTarget.id, {
        name: editName.trim(),
        phone: sanitizePhone(editPhone),
        role: finalRole,
      });
      setEditTarget(null);
    } finally {
      setUpdating(false);
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? m.role === filterRole : true;
    return matchesName && matchesRole;
  });

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Manage Members</h3>

      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={styles.filterSelect}
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <input
            className={styles.input}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
              <option key={r}>{r}</option>
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
        <button className={styles.addBtn} disabled={adding}>
          {adding ? <span className={styles.spinner} /> : <FaPlus />}
          {adding ? "Adding..." : "Add Member"}
        </button>
      </form>

      <div className={styles.list}>
        {filteredMembers.length === 0 && (
          <p className={styles.empty}>No members found.</p>
        )}
        {filteredMembers.map((m) => (
          <div key={m.id} className={styles.memberRow}>
            <FaUserAlt className={styles.userIcon} />
            <div className={styles.memberInfo}>
              <span className={styles.memberName}>{m.name}</span>
              {m.phone && <span className={styles.memberPhone}>{m.phone}</span>}
              <span className={styles.memberRole}>{m.role}</span>
            </div>
            <div className={styles.rowActions}>
              <button
                className={styles.editBtn}
                onClick={() => openEdit(m)}
                disabled={removingId === m.id}
                title="Edit member"
              >
                <FaEdit />
              </button>
              <button
                className={`${styles.removeBtn} ${confirmId === m.id ? styles.confirm : ""}`}
                onClick={() => handleRemove(m.id)}
                disabled={removingId === m.id}
                title={
                  confirmId === m.id
                    ? "Click again to confirm"
                    : "Remove member"
                }
              >
                {removingId === m.id ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    <FaTrash />
                    {confirmId === m.id && " Confirm?"}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editTarget && (
        <div
          className={styles.modalOverlay}
          onClick={() => setEditTarget(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h4 className={styles.modalTitle}>Edit Member</h4>
            <form className={styles.form} onSubmit={handleEditSave}>
              <div className={styles.fields}>
                <input
                  className={styles.input}
                  placeholder="Full name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  placeholder="07XXXXXXXX or 011XXXXXXX"
                  value={editPhone}
                  onChange={(e) => setEditPhone(sanitizePhone(e.target.value))}
                  onPaste={(e) => {
                    e.preventDefault();
                    setEditPhone(
                      sanitizePhone(e.clipboardData.getData("text")),
                    );
                  }}
                  inputMode="numeric"
                  maxLength={10}
                />
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
                {editRole === "custom" && (
                  <input
                    className={styles.input}
                    placeholder="Enter role"
                    value={editCustomRole}
                    onChange={(e) => setEditCustomRole(e.target.value)}
                  />
                )}
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setEditTarget(null)}
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.addBtn}
                  disabled={updating}
                >
                  {updating ? (
                    <span className={styles.spinner} />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManager;
