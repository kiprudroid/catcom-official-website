import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./EventsSection.module.css";
import { FaSpinner } from "react-icons/fa";
import {
  fetchEvents,
  updateEvent,
  deleteEvent,
  createEvent,
} from "@/api/events.api";
import { EventTable, EventModal, EventToolbar } from "./widgets/index.js";

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
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

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
    setSaving(true);
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
    } finally {
      setSaving(false);
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
    setDeletingId(id);
    try {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      await deleteEvent(id);
      toast.success("Event deleted");
    } catch {
      toast.error("Delete failed");
      setEvents(previous);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.venue.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || ev.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Events Management</h2>
        <button
          className={styles.createBtn}
          onClick={() => {
            setEditingEvent(null);
            setForm(emptyForm);
            setModalOpen(true);
          }}
        >
          + Create Event
        </button>
      </div>

      <EventToolbar
        search={search}
        onSearch={setSearch}
        activeFilter={activeFilter}
        onFilter={setActiveFilter}
        totalCount={events.length}
        filteredCount={filteredEvents.length}
      />

      {loading ? (
        <div className={styles.loadingWrap}>
          <FaSpinner className={styles.spinnerIcon} />
          <span>Loading events…</span>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className={styles.empty}>
          No events match your search or filter.
        </div>
      ) : (
        <EventTable
          events={filteredEvents}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <EventModal
          editingEvent={editingEvent}
          form={form}
          saving={saving}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EventSection;
