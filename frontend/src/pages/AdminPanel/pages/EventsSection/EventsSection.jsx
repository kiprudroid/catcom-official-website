import React, { useState, useEffect } from "react";
import styles from "./EventsSection.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

export default function EventsSection() {
  const [events, setEvents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_events")) || [];
    } catch {
      return [];
    }
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    venue: "",
    time: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem("admin_events", JSON.stringify(events));
  }, [events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventForm((s) => ({ ...s, [name]: value }));
  };

  const submitEvent = (e) => {
    e.preventDefault();
    if (editingEvent !== null) {
      setEvents((prev) => {
        const updated = [...prev];
        updated[editingEvent] = eventForm;
        return updated;
      });
      setEditingEvent(null);
    } else {
      setEvents((prev) => [...prev, eventForm]);
    }
    setEventForm({ title: "", date: "", venue: "", time: "" });
  };

  const deleteEvent = (idx) =>
    setEvents((prev) => prev.filter((_, i) => i !== idx));
  const editEvent = (idx) => {
    setEventForm(events[idx]);
    setEditingEvent(idx);
  };

  return (
    <section className={styles.section}>
      <SectionHeading>Events</SectionHeading>

      <form onSubmit={submitEvent} className={styles.form}>
        <input
          name="title"
          value={eventForm.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          name="date"
          type="date"
          value={eventForm.date}
          onChange={handleChange}
          required
        />
        <input
          name="venue"
          value={eventForm.venue}
          onChange={handleChange}
          placeholder="Venue"
          required
        />
        <input
          name="time"
          type="time"
          value={eventForm.time}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingEvent !== null ? "Update Event" : "Add Event"}
        </button>
      </form>

      <ul className={styles.list}>
        {events.map((ev, idx) => (
          <li key={idx} className={styles.listItem}>
            <div className={styles.listRow}>
              <div>
                <strong>{ev.title}</strong> — {ev.date} @ {ev.venue} ({ev.time})
              </div>
              <div className={styles.actions}>
                <button onClick={() => editEvent(idx)}>Edit</button>
                <button onClick={() => deleteEvent(idx)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
