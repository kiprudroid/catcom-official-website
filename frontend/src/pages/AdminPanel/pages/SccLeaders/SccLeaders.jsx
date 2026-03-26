import React, { useEffect, useMemo, useState } from "react";
import styles from "./SccLeaders.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  fetchSccLeaders,
  createSccLeader,
  updateSccLeader,
  deleteSccLeader as deleteSccLeaderApi,
} from "@/api/sccLeaders.api";

export default function SccLeaders() {
  const SCC_OPTIONS = useMemo(
    () => [
      { value: "all", label: "All" },
      { value: "st-martin", label: "St. Martin De Porres" },
      { value: "mmog", label: "Mary Mother of God" },
      {
        value: "st-therese",
        label: "St. Therese of the child Jesus",
      },
      { value: "st-veronica", label: "St. Veronica" },
      { value: "st-charles", label: "St Charles Lwanga" },
      { value: "st-stephen", label: "St. Stephen" },
      { value: "st-jude", label: "St. Jude" },
      { value: "st-paul", label: "St. Paul" },
    ],
    [],
  );

  const normalizeSccName = (name) =>
    String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  const EMPTY_FORM = {
    exec_full_name: "",
    position: "",
    scc_name: "",
    image_url: "",
  };

  const [sccLeaders, setSccLeaders] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentScc, setCurrentScc] = useState("all");

  //Fetch data
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

  //Reset form
  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setEditingId(null);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImageFile(files?.[0] ?? null);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Start editing
  const startEdit = (leader) => {
    setEditingId(leader.exec_id);
    setError("");

    setForm({
      exec_full_name: leader.exec_full_name || "",
      position: leader.position || "",
      scc_name: leader.scc_name || "",
      image_url: leader.exec_image || "",
    });

    setImageFile(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    resetForm();
    setError("");
  };

  // Update state after create/update
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

  //  Submit (Create / Update)
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

  // Delete leader
  const removeSccLeader = async (id) => {
    if (!id) return;

    setError("");

    const previous = sccLeaders;

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

        <select
          name="scc_name"
          value={form.scc_name}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select SCC
          </option>
          {SCC_OPTIONS.filter((opt) => opt.value !== "all").map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

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

      {/* Filter */}
      <div className={styles.actions}>
        <label>
          Filter by SCC:{" "}
          <select
            value={currentScc}
            onChange={(e) => setCurrentScc(e.target.value)}
          >
            {SCC_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* List */}
      <ul className={styles.list}>
        {sccLeaders
          .filter((l) => {
            if (currentScc === "all") return true;
            return (
              normalizeSccName(l.scc_name) === normalizeSccName(currentScc)
            );
          })
          .map((l) => {
            const id = l.exec_id;

            return (
              <li key={id} className={styles.listItem}>
                <div className={styles.listRow}>
                  <div className={styles.listLeft}>
                    {l.exec_image && (
                      <img
                        src={`http://localhost:5000${l.exec_image}`}
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
                    <button type="button" onClick={() => removeSccLeader(id)}>
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
