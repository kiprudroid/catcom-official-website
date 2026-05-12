import React from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./SccLeaderForm.module.css";

export default function SccLeaderForm({
  form,
  imageFile,
  editingId,
  submitting,
  error,
  sccOptions,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}

      <input
        name="exec_full_name"
        value={form.exec_full_name}
        onChange={onChange}
        placeholder="Full name"
        required
        className={styles.input}
      />

      <input
        name="position"
        value={form.position}
        onChange={onChange}
        placeholder="Position"
        required
        className={styles.input}
      />

      <select
        name="scc_name"
        value={form.scc_name}
        onChange={onChange}
        required
        className={styles.select}
      >
        <option value="" disabled>
          Select SCC
        </option>
        {sccOptions
          .filter((o) => o.value !== "all")
          .map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
      </select>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onChange}
        className={styles.fileInput}
      />

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={submitting}
          className={styles.submitBtn}
        >
          {submitting ? (
            <>
              <FaSpinner className={styles.spinner} />
              {editingId !== null ? "Updating…" : "Adding…"}
            </>
          ) : editingId !== null ? (
            "Update Leader"
          ) : (
            "Add Leader"
          )}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
