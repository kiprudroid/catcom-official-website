import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./EventsSection.module.css";
import {
  fetchEvents,
  updateEvent,
  deleteEvent,
  createEvent,
} from "@/api/events.api";

const CATEGORIES = ["Activity", "Mass Animation"];

const emptyForm = {
  title: "",
  event_date: "",
  event_time: "",
  venue: "",
  category: "Activity",
};

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === editingEvent.id ? { ...ev, ...form } : ev,
          ),
        );
        await updateEvent(editingEvent.id, form);
        toast.success("Event updated");
      } else {
        const newEvent = await createEvent(form);
        setEvents((prev) => [...prev, newEvent]);
        toast.success("Event created");
      }
      setModalOpen(false);
      setEditingEvent(null);
      setForm(emptyForm);
    } catch {
      toast.error("Operation failed");
      loadEvents();
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      event_date: event.event_date,
      event_time: event.event_time,
      venue: event.venue,
      category: event.category || "Activity",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    const previous = events;
    try {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      await deleteEvent(id);
      toast.success("Event deleted");
    } catch {
      toast.error("Delete failed");
      setEvents(previous);
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Events Management</h2>
        <button className={styles.createBtn} onClick={openCreateModal}>
          + Create Event
        </button>
      </div>

      {loading ? (
        <div className={styles.spinner}>Loading events...</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>
                  <span
                    className={`${styles.categoryBadge} ${event.category === "Mass Animation" ? styles.mass : styles.activity}`}
                  >
                    {event.category}
                  </span>
                </td>
                <td>{event.event_date}</td>
                <td>{event.event_time}</td>
                <td>{event.venue}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{editingEvent ? "Edit Event" : "Create Event"}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={styles.select}
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
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="event_time"
                value={form.event_time}
                onChange={handleChange}
                required
              />

              <input
                name="venue"
                placeholder="Venue"
                value={form.venue}
                onChange={handleChange}
                required
              />

              <div className={styles.modalActions}>
                <button className={styles.submitBtn} type="submit">
                  {editingEvent ? "Update" : "Create"}
                </button>
                <button
                  className={styles.cancelBtn}
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSection;

