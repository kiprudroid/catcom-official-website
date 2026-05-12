import React, { useEffect, useMemo, useState } from "react";
import styles from "./SccLeaders.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import { FaSearch, FaSpinner } from "react-icons/fa";
import {
  fetchSccLeaders,
  createSccLeader,
  updateSccLeader,
  deleteSccLeader as deleteSccLeaderApi,
} from "@/api/sccLeaders.api";
import { SccLeaderForm, SccAccordion } from "./widgets";

const SCC_OPTIONS = [
  { value: "all", label: "All" },
  { value: "st-martin", label: "St. Martin De Porres" },
  { value: "mmog", label: "Mary Mother of God" },
  { value: "st-therese", label: "St. Therese of the Child Jesus" },
  { value: "st-veronica", label: "St. Veronica" },
  { value: "st-charles", label: "St Charles Lwanga" },
  { value: "st-stephen", label: "St. Stephen" },
  { value: "st-jude", label: "St. Jude" },
  { value: "st-paul", label: "St. Paul" },
];

const EMPTY_FORM = {
  exec_full_name: "",
  position: "",
  scc_name: "",
  image_url: "",
};

const normalize = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

export default function SccLeaders() {
  const [sccLeaders, setSccLeaders] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editSpinnerId, setEditSpinnerId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchSccLeaders();
        setSccLeaders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || "Error fetching SCC leaders");
      } finally {
        setLoading(false);
      }
    })();
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

  const upsertLeader = (saved) => {
    setSccLeaders((prev) => {
      const idx = prev.findIndex((l) => l.exec_id === saved.exec_id);
      if (idx === -1) return [saved, ...prev];
      const next = [...prev];
      next[idx] = saved;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const fd = new FormData();
    fd.append("exec_full_name", form.exec_full_name);
    fd.append("position", form.position);
    fd.append("scc_name", form.scc_name);
    if (imageFile) fd.append("image", imageFile);

    try {
      const saved =
        editingId === null
          ? await createSccLeader(fd)
          : await updateSccLeader(editingId, fd);
      upsertLeader(saved);
      resetForm();
    } catch (err) {
      setError(err?.message || "Error submitting leader");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (leader) => {
    if (!leader?.exec_id) return;
    setEditSpinnerId(leader.exec_id);
    setEditingId(leader.exec_id);
    setError("");
    setForm({
      exec_full_name: leader.exec_full_name || "",
      position: leader.position || "",
      scc_name: leader.scc_name || "",
      image_url: leader.exec_image || "",
    });
    setImageFile(null);
    window.setTimeout(
      () => setEditSpinnerId((p) => (p === leader.exec_id ? null : p)),
      700,
    );
  };

  const handleDelete = async (id) => {
    if (!id) return;
    setError("");
    const prev = sccLeaders;
    setSccLeaders((l) => l.filter((x) => x.exec_id !== id));
    try {
      await deleteSccLeaderApi(id);
      if (editingId === id) resetForm();
    } catch (err) {
      setSccLeaders(prev);
      setError(err?.message || "Error deleting leader");
    }
  };

  return (
    <section className={styles.section}>
      <SectionHeading>SCC Leaders</SectionHeading>

      <SccLeaderForm
        form={form}
        imageFile={imageFile}
        editingId={editingId}
        submitting={submitting}
        error={error}
        sccOptions={SCC_OPTIONS}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          resetForm();
          setError("");
        }}
      />

      <div className={styles.searchField}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Search leaders by name…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.listWrapper}>
        {loading ? (
          <div className={styles.spinnerWrap}>
            <FaSpinner className={styles.spinnerLg} />
          </div>
        ) : (
          <SccAccordion
            sccOptions={SCC_OPTIONS}
            leaders={sccLeaders}
            searchTerm={searchTerm}
            editSpinnerId={editSpinnerId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </section>
  );
}
