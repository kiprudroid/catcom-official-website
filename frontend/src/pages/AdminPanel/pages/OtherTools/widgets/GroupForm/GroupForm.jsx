import React from "react";
import styles from "./GroupForm.module.css";

const GROUP_TYPES = ["committee", "scc", "group", "other"];

const GroupForm = ({
  groupForm,
  setGroupForm,
  editingGroup,
  onSubmit,
  onCancel,
  loading,
}) => (
  <form className={styles.container} onSubmit={onSubmit}>
    <h3 className={styles.title}>
      {editingGroup ? "Edit Group" : "Create New Group"}
    </h3>
    <div className={styles.row}>
      <input
        className={styles.input}
        placeholder="Group name (e.g. Welfare Committee)"
        value={groupForm.name}
        onChange={(e) => setGroupForm((p) => ({ ...p, name: e.target.value }))}
        required
        disabled={loading}
      />
      <select
        className={styles.select}
        value={groupForm.type}
        onChange={(e) => setGroupForm((p) => ({ ...p, type: e.target.value }))}
        disabled={loading}
      >
        {GROUP_TYPES.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
      <button className={styles.saveBtn} type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner} />
            {editingGroup ? "Updating…" : "Creating…"}
          </>
        ) : editingGroup ? (
          "Update"
        ) : (
          "Create"
        )}
      </button>
      <button
        className={styles.cancelBtn}
        type="button"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </button>
    </div>
  </form>
);

export default GroupForm;
