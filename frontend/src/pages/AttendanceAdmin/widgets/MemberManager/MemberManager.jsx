import React, { useState } from "react";
import styles from "./MemberManager.module.css";
import { FaPlus, FaTrash, FaUserAlt, FaSearch } from "react-icons/fa";

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

const MemberManager = ({ members, addMember, removeMember }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");

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

  const filteredMembers = members.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? m.role === filterRole : true;
    return matchesName && matchesRole;
  });

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Manage Members</h3>

      {/* SEARCH + FILTER */}
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
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* ADD MEMBER FORM */}
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

      {/* MEMBER LIST */}
      <div className={styles.list}>
        {filteredMembers.length === 0 && (
          <p className={styles.empty}>No members found.</p>
        )}
        {filteredMembers.map((m) => (
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
