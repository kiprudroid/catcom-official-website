import React, { useState, useEffect } from "react";
import styles from "./MediaSection.module.css";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import {
  fetchAdminMedia,
  createMediaItem,
  updateMediaItem,
  deleteMediaItem,
  toggleMediaPublished,
  getImageUrl,
} from "@/api/media.api";
import { MediaForm, MediaControls, MediaList } from "./widgets";

const emptyForm = {
  type: "youtube",
  title: "",
  url: "",
  description: "",
  published: true,
};

const MediaSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Poster state lives here and is passed down to MediaForm
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);

  const load = async () => {
    try {
      const data = await fetchAdminMedia({ type: filter, search });
      setItems(data);
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter, search]);

  // Clear poster when type changes away from poster
  useEffect(() => {
    if (form.type !== "poster") {
      setPosterFile(null);
      setPosterPreview(null);
    }
  }, [form.type]);

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      return;
    }
    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const clearPoster = () => {
    setPosterFile(null);
    setPosterPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;
      if (form.type === "poster") {
        const fd = new FormData();
        fd.append("type", "poster");
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("published", form.published);
        if (posterFile) fd.append("poster", posterFile);
        payload = fd;
      } else {
        payload = form;
      }

      if (editing) {
        const updated = await updateMediaItem(editing.id, payload);
        setItems((prev) =>
          prev.map((i) => (i.id === updated.id ? updated : i)),
        );
        toast.success("Updated");
      } else {
        const created = await createMediaItem(payload);
        setItems((prev) => [created, ...prev]);
        toast.success("Created");
      }

      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
      clearPoster();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      type: item.type,
      title: item.title,
      url: item.url || "",
      description: item.description || "",
      published: item.published,
    });
    if (item.type === "poster" && item.thumbnail) {
      setPosterPreview(getImageUrl(item.thumbnail));
    }
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteMediaItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggle = async (id) => {
    try {
      const updated = await toggleMediaPublished(id);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch {
      toast.error("Failed to toggle");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    clearPoster();
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Media &amp; Announcements</h2>
          <p className={styles.sub}>
            Manage videos, social links, announcements and posters shown on the
            site.
          </p>
        </div>
        <button
          className={styles.newBtn}
          onClick={() => {
            setShowForm(!showForm);
            setEditing(null);
            setForm(emptyForm);
            clearPoster();
          }}
        >
          <FaPlus /> Add Item
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <MediaForm
          form={form}
          setForm={setForm}
          editing={editing}
          posterPreview={posterPreview}
          onPosterChange={handlePosterChange}
          onClearPoster={clearPoster}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {/* Search + Filters */}
      <MediaControls
        filter={filter}
        onFilterChange={setFilter}
        onSearch={setSearch}
      />

      {/* List */}
      {loading ? (
        <p className={styles.loading}>Loading…</p>
      ) : (
        <MediaList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
};

export default MediaSection;
