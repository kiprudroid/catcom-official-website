import styles from "./MemberTable.module.css";

function MemberTable({
  members,
  deletingId,
  confirmId,
  onSelectMember,
  onDeleteClick,
  onConfirmDelete,
  onCancelDelete,
}) {
  if (members.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span>📭</span>
        <p>No submissions found.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>College</th>
            <th>Group(s) Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((s, index) => (
            <tr
              key={s.user_id}
              className={deletingId === s.user_id ? styles.rowDeleting : ""}
            >
              <td className={styles.indexCell}>{index + 1}</td>
              <td className={styles.nameCell}>
                <button
                  className={styles.memberBtn}
                  onClick={() => onSelectMember(s)}
                  title="Click to view details"
                >
                  <span className={styles.avatar}>
                    {s.full_name.charAt(0).toUpperCase()}
                  </span>
                  <span className={styles.memberName}>{s.full_name}</span>
                </button>
              </td>
              <td>
                <a href={`tel:${s.phone_number}`} className={styles.phoneLink}>
                  {s.phone_number}
                </a>
              </td>
              <td>{s.email}</td>
              <td>
                <span
                  className={`${styles.genderPill} ${s.gender?.toLowerCase() === "male" ? styles.male : styles.female}`}
                >
                  {s.gender}
                </span>
              </td>
              <td>{s.college}</td>
              <td>
                <div className={styles.groupTags}>
                  {s.group_joined?.split(",").map((g) => (
                    <span key={g.trim()} className={styles.groupTag}>
                      {g.trim()}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                {confirmId === s.user_id ? (
                  <div className={styles.confirmInline}>
                    <span>Remove?</span>
                    <button
                      className={styles.confirmYes}
                      onClick={() => onConfirmDelete(s.user_id)}
                    >
                      Yes
                    </button>
                    <button
                      className={styles.confirmNo}
                      onClick={onCancelDelete}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDeleteClick(s.user_id)}
                    disabled={deletingId === s.user_id}
                  >
                    {deletingId === s.user_id ? "Removing…" : "Remove"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;
