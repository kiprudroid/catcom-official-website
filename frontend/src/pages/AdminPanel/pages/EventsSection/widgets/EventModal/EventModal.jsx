import React from "react";
import styles from "./EventModal.module.css";
import { FaSpinner } from "react-icons/fa";

const CATEGORIES = ["Activity", "Mass Animation"];

const EventModal = ({
  editingEvent,
  form,
  saving,
  onChange,
  onSubmit,
  onClose,
}) => (
  <div className={styles.modalBackdrop}>
    <div className={styles.modal}>
      <h3>{editingEvent ? "Edit Event" : "Create Event"}</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          required
          disabled={saving}
        />
        <select
          name="category"
          value={form.category}
          onChange={onChange}
          required
          className={styles.select}
          disabled={saving}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="event_date"
          value={form.event_date}
          onChange={onChange}
          required
          disabled={saving}
        />
        <input
          type="time"
          name="event_time"
          value={form.event_time}
          onChange={onChange}
          required
          disabled={saving}
        />
        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={onChange}
          required
          disabled={saving}
        />
        <div className={styles.modalActions}>
          <button className={styles.submitBtn} type="submit" disabled={saving}>
            {saving ? (
              <>
                <FaSpinner className={styles.btnSpinner} />{" "}
                {editingEvent ? "Updating…" : "Creating…"}
              </>
            ) : editingEvent ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
          <button
            className={styles.cancelBtn}
            type="button"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default EventModal;
