import { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

export default function AdminPanel() {
  const [leaders, setLeaders] = useState([]);
  const [events, setEvents] = useState([]);

  const [leaderForm, setLeaderForm] = useState({
    name: "",
    role: "",
    description: "",
    email: "",
    photo: null,
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    venue: "",
    time: "",
  });

  const [editingLeader, setEditingLeader] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Dummy fetch
  useEffect(() => {
    fetch("/api/admin/leaders")
      .then((res) => res.json())
      .then(setLeaders);
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  // Handle input change
  const handleChange = (e, type) => {
    const { name, value, files } = e.target;
    if (type === "leader") {
      if (name === "photo" && files?.[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          setLeaderForm({ ...leaderForm, photo: reader.result });
        };
        reader.readAsDataURL(files[0]);
      } else {
        setLeaderForm({ ...leaderForm, [name]: value });
      }
    }
    if (type === "event") {
      setEventForm({ ...eventForm, [name]: value });
    }
  };

  // Submit leader
  const submitLeader = async (e) => {
    e.preventDefault();
    if (editingLeader !== null) {
      const updated = [...leaders];
      updated[editingLeader] = leaderForm;
      setLeaders(updated);
      setEditingLeader(null);
    } else {
      setLeaders([...leaders, leaderForm]);
    }
    setLeaderForm({
      name: "",
      role: "",
      description: "",
      email: "",
      photo: null,
    });
  };

  // Submit event
  const submitEvent = async (e) => {
    e.preventDefault();
    if (editingEvent !== null) {
      const updated = [...events];
      updated[editingEvent] = eventForm;
      setEvents(updated);
      setEditingEvent(null);
    } else {
      setEvents([...events, eventForm]);
    }
    setEventForm({ title: "", date: "", venue: "", time: "" });
  };

  // Delete leader
  const deleteLeader = (idx) => {
    setLeaders(leaders.filter((_, i) => i !== idx));
  };

  // Edit leader
  const editLeader = (idx) => {
    setLeaderForm(leaders[idx]);
    setEditingLeader(idx);
  };

  // Delete event
  const deleteEvent = (idx) => {
    setEvents(events.filter((_, i) => i !== idx));
  };

  // Edit event
  const editEvent = (idx) => {
    setEventForm(events[idx]);
    setEditingEvent(idx);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.logoGroup} ${styles.header}`}>
        <img
          src="/others/catcom-logo.png"
          alt="CATCOM Logo"
          className={styles.catcomLogo}
        />
        <SectionHeading className={styles.title}>
          JKUAT CATCOM ADMIN PANEL
        </SectionHeading>
      </div>

      {/* Leaders Section */}
      <section className={styles.section}>
        <SectionHeading>Leaders</SectionHeading>
        <form onSubmit={submitLeader} className={styles.form}>
          <input
            name="name"
            value={leaderForm.name}
            onChange={(e) => handleChange(e, "leader")}
            placeholder="Name"
            required
          />
          <input
            name="role"
            value={leaderForm.role}
            onChange={(e) => handleChange(e, "leader")}
            placeholder="Role"
            required
          />
          <textarea
            name="description"
            value={leaderForm.description}
            onChange={(e) => handleChange(e, "leader")}
            placeholder="Role description"
            rows="3"
            required
          />
          <input
            name="email"
            type="email"
            value={leaderForm.email}
            onChange={(e) => handleChange(e, "leader")}
            placeholder="Email"
            required
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => handleChange(e, "leader")}
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
              {l.photo && (
                <img src={l.photo} alt={l.name} className={styles.avatar} />
              )}
              <strong>{l.name}</strong> — {l.role}
              <p>{l.description}</p>
              <small>{l.email}</small>
              <div className={styles.actions}>
                <button onClick={() => editLeader(idx)}>Edit</button>
                <button onClick={() => deleteLeader(idx)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Events Section */}
      <section className={styles.section}>
        <SectionHeading>Events</SectionHeading>
        <form onSubmit={submitEvent} className={styles.form}>
          <input
            name="title"
            value={eventForm.title}
            onChange={(e) => handleChange(e, "event")}
            placeholder="Title"
            required
          />
          <input
            name="date"
            type="date"
            value={eventForm.date}
            onChange={(e) => handleChange(e, "event")}
            required
          />
          <input
            name="venue"
            value={eventForm.venue}
            onChange={(e) => handleChange(e, "event")}
            placeholder="Venue"
            required
          />
          <input
            name="time"
            type="time"
            value={eventForm.time}
            onChange={(e) => handleChange(e, "event")}
            required
          />
          <button type="submit">
            {editingEvent !== null ? "Update Event" : "Add Event"}
          </button>
        </form>
        <ul className={styles.list}>
          {events.map((ev, idx) => (
            <li key={idx} className={styles.listItem}>
              <strong>{ev.title}</strong> — {ev.date} @ {ev.venue} ({ev.time})
              <div className={styles.actions}>
                <button onClick={() => editEvent(idx)}>Edit</button>
                <button onClick={() => deleteEvent(idx)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
