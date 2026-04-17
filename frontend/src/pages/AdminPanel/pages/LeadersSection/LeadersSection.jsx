import React, { useEffect, useState } from "react";
import styles from "./LeadersSection.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  fetchLeaders,
  createLeader,
  updateLeader,
  deleteLeader as deleteLeaderApi,
} from "@/api/leaders.api";
import { BACKEND_URL } from "@/data/urlClient";

export default function LeadersSection() {
  const EMPTY_FORM = {
    full_name: "",
    post_title: "",
    exec_description: "",
    image_url: "",
  };

  const [leaders, setLeaders] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  // Keep the selected file separate from text fields (multipart upload)
  const [imageFile, setImageFile] = useState(null);

  // we keep the id we are editing; null means "create" mode
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentScc, setCurrentScc] = useState(null);

  useEffect(() => {
    const loadLeaders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchLeaders();
        setLeaders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching leaders:", err);
        setError(err?.message || "Error fetching leaders");
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImageFile(files?.[0] ?? null);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (leader) => {
    // Some APIs return `id` while others use `user_id`.
    const id = leader?.user_id ?? leader?.id ?? null;

    setEditingId(id);
    setError("");

    setForm({
      full_name: leader?.full_name ?? "",
      post_title: leader?.post_title ?? "",
      exec_description: leader?.exec_description ?? "",
      image_url: leader?.image_url ?? "",
    });

    // When editing, we only upload a new image if the user selects one.
    setImageFile(null);
  };

  const cancelEdit = () => {
    resetForm();
    setError("");
  };

  const upsertLeaderInState = (savedLeader, fallbackId) => {
    const savedId =
      savedLeader?.user_id ?? savedLeader?.id ?? fallbackId ?? null;

    if (savedId == null) {
      // If backend returns a non-standard shape, safest is re-fetch.
      return false;
    }

    setLeaders((prev) => {
      const idx = prev.findIndex((l) => (l?.user_id ?? l?.id) === savedId);
      if (idx === -1) return [savedLeader, ...prev];
      const copy = [...prev];
      copy[idx] = savedLeader;
      return copy;
    });

    return true;
  };

  const submitLeader = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    // multipart payload
    const fd = new FormData();
    fd.append("full_name", form.full_name);
    fd.append("post_title", form.post_title);
    fd.append("exec_description", form.exec_description);

    // Optional: allow backend to keep existing image on update if no new file is provided.
    if (imageFile) fd.append("image", imageFile);

    try {
      if (editingId == null) {
        const created = await createLeader(fd);

        const ok = upsertLeaderInState(created, null);
        if (!ok) {
          const data = await fetchLeaders();
          setLeaders(Array.isArray(data) ? data : []);
        }

        resetForm();
        return;
      }

      const updated = await updateLeader(editingId, fd);

      const ok = upsertLeaderInState(updated, editingId);
      if (!ok) {
        const data = await fetchLeaders();
        setLeaders(Array.isArray(data) ? data : []);
      }

      resetForm();
    } catch (err) {
      console.error("Error submitting leader:", err);
      setError(err?.message || "Error submitting leader");
    } finally {
      setSubmitting(false);
    }
  };

  const removeLeader = async (idLike) => {
    const id = idLike ?? null;
    if (id == null) return;

    setError("");

    // optimistic update
    const previous = leaders;
    setLeaders((prev) => prev.filter((l) => (l?.user_id ?? l?.id) !== id));

    try {
      await deleteLeaderApi(id);
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Error deleting leader:", err);
      setLeaders(previous);
      setError(err?.message || "Error deleting leader");
    }
  };

  return (
    <section className={styles.section}>
      <SectionHeading>Leaders</SectionHeading>

      {error ? <p className={styles.error}>{error}</p> : null}
      {loading ? <p>Loading...</p> : null}

      <form onSubmit={submitLeader} className={styles.form}>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />

        <input
          name="post_title"
          value={form.post_title}
          onChange={handleChange}
          placeholder="Post title"
          required
        />

        <textarea
          name="exec_description"
          value={form.exec_description}
          onChange={handleChange}
          placeholder="Executive description"
          rows={3}
          required
        />

        {/* multipart file upload field (must match backend multer: .single("image")) */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <div className={styles.actions}>
          <button type="submit" className={styles.actionButton}>
            {editingId != null ? "Update Leader" : "Add Leader"}
          </button>

          {editingId != null ? (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <ul className={styles.list}>
        {leaders.map((l) => {
          const id = l?.user_id ?? l?.id;
          return (
            <li key={id} className={styles.listItem}>
              <div className={styles.listRow}>
                <div className={styles.listLeft}>
                  {l?.image_url ? (
                    <img
                      src={`${BACKEND_URL}${l.image_url}`}
                      alt={l?.full_name || "leader"}
                      className={styles.avatar}
                    />
                  ) : null}

                  <div>
                    <strong>{l?.full_name}</strong> —{" "}
                    <span className={styles.role}>{l?.post_title}</span>
                    <p className={styles.desc}>{l?.exec_description}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" onClick={() => startEdit(l)} className={styles.actionButton}>
                    Edit
                  </button>
                  <button type="button" onClick={() => removeLeader(id)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
