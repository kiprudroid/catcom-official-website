import React, { useRef } from "react";
import styles from "./MediaForm.module.css";
import { FaUpload, FaTimes } from "react-icons/fa";

const TYPES = [
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "instagram", label: "Instagram" },
  { key: "announcement", label: "Announcement" },
  { key: "poster", label: "Poster" },
];

const MediaForm = ({
  form,
  setForm,
  editing,
  posterPreview,
  onPosterChange,
  onClearPoster,
  onSubmit,
  onCancel,
}) => {
  const fileInputRef = useRef(null);

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      encType={form.type === "poster" ? "multipart/form-data" : undefined}
    >
      <h3 className={styles.formTitle}>
        {editing ? "Edit Item" : "Add New Item"}
      </h3>

      {/* Type + Title row */}
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label}>Type</label>
          <select
            className={styles.select}
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
          >
            {TYPES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.field} ${styles.grow}`}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
        </div>
      </div>

      {/* URL — hidden for announcement and poster */}
      {form.type !== "announcement" && form.type !== "poster" && (
        <div className={styles.field}>
          <label className={styles.label}>URL</label>
          <input
            className={styles.input}
            placeholder={
              form.type === "youtube" ? "https://youtu.be/..." : "https://..."
            }
            value={form.url}
            onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
            required
          />
        </div>
      )}

      {/* Poster upload */}
      {form.type === "poster" && (
        <div className={styles.field}>
          <label className={styles.label}>Poster Image</label>

          {posterPreview ? (
            <div className={styles.posterPreviewWrapper}>
              <img
                src={posterPreview}
                alt="Poster preview"
                className={styles.posterPreview}
              />
              <button
                type="button"
                className={styles.clearPosterBtn}
                onClick={onClearPoster}
                title="Remove image"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div
              className={styles.dropZone}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) onPosterChange({ target: { files: [file] } });
              }}
            >
              <FaUpload className={styles.dropIcon} />
              <span className={styles.dropText}>
                Click or drag &amp; drop a poster image
              </span>
              <span className={styles.dropHint}>JPG, PNG, WEBP · max 5 MB</span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenFileInput}
            onChange={onPosterChange}
          />
        </div>
      )}

      {/* Caption / Content */}
      <div className={styles.field}>
        <label className={styles.label}>
          {form.type === "announcement" ? "Content" : "Caption (optional)"}
        </label>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder={
            form.type === "announcement"
              ? "Announcement text…"
              : form.type === "poster"
                ? "Add a caption for this poster…"
                : "Short caption…"
          }
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
        />
      </div>

      {/* Actions */}
      <div className={styles.formActions}>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) =>
              setForm((p) => ({ ...p, published: e.target.checked }))
            }
          />
          Publish immediately
        </label>

        <div className={styles.btnRow}>
          <button className={styles.saveBtn} type="submit">
            {editing ? "Update" : "Create"}
          </button>
          <button className={styles.cancelBtn} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default MediaForm;
