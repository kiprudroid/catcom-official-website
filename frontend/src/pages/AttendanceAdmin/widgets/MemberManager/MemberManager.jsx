import React, { useState } from "react";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import {
  MemberRow,
  MemberSearch,
  AddMemberForm,
  EditMemberModal,
} from "./widgets";
import styles from "./MemberManager.module.css";

const MemberManager = ({
  members,
  addMember,
  removeMember,
  updateMember,
  groupType,
}) => {
  const isSCC = groupType === "scc";

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

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

  const filteredMembers = members.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? m.role === filterRole : true;
    return matchesName && matchesRole;
  });

  return (
    <div className={styles.card}>
      <div className={`${styles.section} ${styles.sectionMembers}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <FaUsers size={14} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Members</h3>
            <p className={styles.sectionSub}>{members.length} total</p>
          </div>
        </div>

        <MemberSearch
          search={search}
          filterRole={filterRole}
          onSearchChange={setSearch}
          onFilterChange={setFilterRole}
        />

        <div className={styles.list}>
          {filteredMembers.length === 0 && (
            <p className={styles.empty}>No members found.</p>
          )}
          {filteredMembers.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              isSCC={isSCC}
              confirmId={confirmId}
              removingId={removingId}
              onEdit={setEditTarget}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>

      <div className={`${styles.section} ${styles.sectionAdd}`}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionIcon} ${styles.sectionIconAlt}`}>
            <FaUserAlt size={13} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Add Member</h3>
            <p className={styles.sectionSub}>Fill in the details below</p>
          </div>
        </div>

        <AddMemberForm onAdd={addMember} isSCC={isSCC} />
      </div>

      {editTarget && (
        <EditMemberModal
          member={editTarget}
          isSCC={isSCC}
          onSave={updateMember}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
};

export default MemberManager;
