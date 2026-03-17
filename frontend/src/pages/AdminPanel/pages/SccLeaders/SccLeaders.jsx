import React, { useEffect, useState } from "react";
import styles from "./SccLeaders.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  fetchSccLeaders,
  createSccLeader,
  updateSccLeader,
  deleteSccLeader as deleteSccLeaderApi,
} from "@/api/sccLeaders.api";

export default function SccLeaders() {
  const EMPTY_FORM = {
    exec_full_name: "",
    position: "",
    scc_name: "",
    image_url: "",
  };

  const [SccLeaders, setSccLeaders] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch data
  useEffect(() => {
    const loadSccLeaders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchSccLeaders();
        setSccLeaders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching SCC leaders:", err);
        setError(err?.message || "Error fetching SCC leaders");
      } finally {
        setLoading(false);
      }
    };

    loadSccLeaders();
  }, []);

  // ✅ Reset form
  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setEditingId(null);
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImageFile(files?.[0] ?? null);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Start editing
  const startEdit = (leader) => {
    setEditingId(leader.exec_id);
    setError("");

    setForm({
      exec_full_name: leader.exec_full_name || "",
      position: leader.position || "",
      scc_name: leader.scc_name || "",
      image_url: leader.image_url || "",
    });

    setImageFile(null);
  };

  // ✅ Cancel edit
  const cancelEdit = () => {
    resetForm();
    setError("");
  };

  // ✅ Update state after create/update
  const upsertLeaderInState = (savedLeader) => {
    const savedId = savedLeader.exec_id;
    if (!savedId) return false;

    setSccLeaders((prev) => {
      const index = prev.findIndex((l) => l.exec_id === savedId);

      if (index === -1) return [savedLeader, ...prev];

      const updated = [...prev];
      updated[index] = savedLeader;
      return updated;
    });

    return true;
  };

  // ✅ Submit (Create / Update)
  const submitLeader = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    const fd = new FormData();
    fd.append("exec_full_name", form.exec_full_name);
    fd.append("position", form.position);
    fd.append("scc_name", form.scc_name);

    if (imageFile) {
      fd.append("image", imageFile);
    }

    try {
      if (editingId === null) {
        const created = await createSccLeader(fd);

        const ok = upsertLeaderInState(created);
        if (!ok) {
          const data = await fetchSccLeaders();
          setSccLeaders(Array.isArray(data) ? data : []);
        }
      } else {
        const updated = await updateSccLeader(editingId, fd);

        const ok = upsertLeaderInState(updated);
        if (!ok) {
          const data = await fetchSccLeaders();
          setSccLeaders(Array.isArray(data) ? data : []);
        }
      }

      resetForm();
    } catch (err) {
      console.error("Error submitting leader:", err);
      setError(err?.message || "Error submitting leader");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Delete leader
  const removeSccLeader = async (id) => {
    if (!id) return;

    setError("");

    const previous = SccLeaders;

    // optimistic update
    setSccLeaders((prev) => prev.filter((l) => l.exec_id !== id));

    try {
      await deleteSccLeaderApi(id);

      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Error deleting SCC leader:", err);
      setSccLeaders(previous);
      setError(err?.message || "Error deleting SCC leader");
    }
  };

  return (
    <section className={styles.section}>
      <SectionHeading>SCC Leaders</SectionHeading>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* ✅ Form */}
      <form onSubmit={submitLeader} className={styles.form}>
        <input
          name="exec_full_name"
          value={form.exec_full_name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />

        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />

        <textarea
          name="scc_name"
          value={form.scc_name}
          onChange={handleChange}
          placeholder="SCC name"
          rows={3}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <div className={styles.actions}>
          <button type="submit" disabled={submitting}>
            {editingId !== null ? "Update SCC Leader" : "Add SCC Leader"}
          </button>

          {editingId !== null && (
            <button type="button" onClick={cancelEdit} disabled={submitting}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ✅ List */}
      <ul className={styles.list}>
        {SccLeaders.map((l) => {
          const id = l.exec_id;

          return (
            <li key={id} className={styles.listItem}>
              <div className={styles.listRow}>
                <div className={styles.listLeft}>
                  {l.image_url && (
                    <img
                      src={`http://localhost:5000${l.image_url}`}
                      alt={l.exec_full_name || "leader"}
                      className={styles.avatar}
                    />
                  )}

                  <div>
                    <strong>{l.exec_full_name}</strong> —{" "}
                    <span className={styles.role}>{l.position}</span>
                    <p className={styles.desc}>{l.scc_name}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" onClick={() => startEdit(l)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSccLeader(id)}
                  >
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