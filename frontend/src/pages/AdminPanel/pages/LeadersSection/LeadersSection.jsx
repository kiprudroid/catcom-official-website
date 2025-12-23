import React, { useState, useEffect } from "react";
import styles from "./LeadersSection.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

export default function LeadersSection() {
  const [leaders, setLeaders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_leaders")) || [];
    } catch {
      return [];
    }
  });

  const [leaderForm, setLeaderForm] = useState({
    name: "",
    role: "",
    description: "",
    email: "",
    photo: null,
  });
  const [editingLeader, setEditingLeader] = useState(null);

  useEffect(() => {
    localStorage.setItem("admin_leaders", JSON.stringify(leaders));
  }, [leaders]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files?.[0]) {
      const reader = new FileReader();
      reader.onload = () =>
        setLeaderForm((s) => ({ ...s, photo: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setLeaderForm((s) => ({ ...s, [name]: value }));
    }
  };

  const submitLeader = (e) => {
    e.preventDefault();
    if (editingLeader !== null) {
      setLeaders((prev) => {
        const updated = [...prev];
        updated[editingLeader] = leaderForm;
        return updated;
      });
      setEditingLeader(null);
    } else {
      setLeaders((prev) => [...prev, leaderForm]);
    }
    setLeaderForm({
      name: "",
      role: "",
      description: "",
      email: "",
      photo: null,
    });
  };

  const deleteLeader = (idx) =>
    setLeaders((prev) => prev.filter((_, i) => i !== idx));
  const editLeader = (idx) => {
    setLeaderForm(leaders[idx]);
    setEditingLeader(idx);
  };

  return (
    <section className={styles.section}>
      <SectionHeading>Leaders</SectionHeading>

      <form onSubmit={submitLeader} className={styles.form}>
        <input
          name="name"
          value={leaderForm.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="role"
          value={leaderForm.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <textarea
          name="description"
          value={leaderForm.description}
          onChange={handleChange}
          placeholder="Role description"
          rows="3"
          required
        />
        <input
          name="email"
          type="email"
          value={leaderForm.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
        />
        {leaderForm.photo && (
          <img
            src={leaderForm.photo}
            alt="preview"
            className={styles.preview}
          />
        )}
        <button type="submit">
          {editingLeader !== null ? "Update Leader" : "Add Leader"}
        </button>
      </form>

      <ul className={styles.list}>
        {leaders.map((l, idx) => (
          <li key={idx} className={styles.listItem}>
            <div className={styles.listRow}>
              <div className={styles.listLeft}>
                {l.photo && (
                  <img src={l.photo} alt={l.name} className={styles.avatar} />
                )}
                <div>
                  <strong>{l.name}</strong> —{" "}
                  <span className={styles.role}>{l.role}</span>
                  <p className={styles.desc}>{l.description}</p>
                  <small>{l.email}</small>
                </div>
              </div>
              <div className={styles.actions}>
                <button onClick={() => editLeader(idx)}>Edit</button>
                <button onClick={() => deleteLeader(idx)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
