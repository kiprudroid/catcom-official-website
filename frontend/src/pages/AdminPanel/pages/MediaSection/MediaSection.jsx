// import React, { useState, useEffect, useRef } from "react";
// import styles from "./MediaSection.module.css";
// import toast from "react-hot-toast";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaEyeSlash,
//   FaYoutube,
//   FaTiktok,
//   FaInstagram,
//   FaBullhorn,
//   FaSearch,
//   FaImage,
//   FaUpload,
//   FaTimes,
// } from "react-icons/fa";
// import {
//   fetchAdminMedia,
//   createMediaItem,
//   updateMediaItem,
//   deleteMediaItem,
//   toggleMediaPublished,
//   getImageUrl, // ← FIX: import the helper
// } from "@/api/media.api";

// const TYPES = [
//   { key: "youtube", label: "YouTube", icon: <FaYoutube /> },
//   { key: "tiktok", label: "TikTok", icon: <FaTiktok /> },
//   { key: "instagram", label: "Instagram", icon: <FaInstagram /> },
//   { key: "announcement", label: "Announcement", icon: <FaBullhorn /> },
//   { key: "poster", label: "Poster", icon: <FaImage /> },
// ];

// const emptyForm = {
//   type: "youtube",
//   title: "",
//   url: "",
//   description: "",
//   published: true,
// };

// const MediaSection = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [editing, setEditing] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [searchInput, setSearchInput] = useState("");

//   const [posterFile, setPosterFile] = useState(null);
//   const [posterPreview, setPosterPreview] = useState(null);
//   const fileInputRef = useRef(null);

//   const load = async () => {
//     try {
//       const data = await fetchAdminMedia({ type: filter, search });
//       setItems(data);
//     } catch {
//       toast.error("Failed to load media");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [filter, search]);

//   useEffect(() => {
//     if (form.type !== "poster") {
//       setPosterFile(null);
//       setPosterPreview(null);
//     }
//   }, [form.type]);

//   const handlePosterChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image must be under 5 MB");
//       return;
//     }
//     setPosterFile(file);
//     setPosterPreview(URL.createObjectURL(file));
//   };

//   const clearPoster = () => {
//     setPosterFile(null);
//     setPosterPreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let payload;
//       if (form.type === "poster") {
//         const fd = new FormData();
//         fd.append("type", "poster");
//         fd.append("title", form.title);
//         fd.append("description", form.description);
//         fd.append("published", form.published);
//         if (posterFile) fd.append("poster", posterFile);
//         payload = fd;
//       } else {
//         payload = form;
//       }

//       if (editing) {
//         const updated = await updateMediaItem(editing.id, payload);
//         setItems((prev) =>
//           prev.map((i) => (i.id === updated.id ? updated : i)),
//         );
//         toast.success("Updated");
//       } else {
//         const created = await createMediaItem(payload);
//         setItems((prev) => [created, ...prev]);
//         toast.success("Created");
//       }

//       setForm(emptyForm);
//       setEditing(null);
//       setShowForm(false);
//       clearPoster();
//     } catch (err) {
//       toast.error(err.message || "Failed to save");
//     }
//   };

//   const handleEdit = (item) => {
//     setEditing(item);
//     setForm({
//       type: item.type,
//       title: item.title,
//       url: item.url || "",
//       description: item.description || "",
//       published: item.published,
//     });
//     // ── FIX: resolve to full URL for the preview ──
//     if (item.type === "poster" && item.thumbnail) {
//       setPosterPreview(getImageUrl(item.thumbnail));
//     }
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     try {
//       await deleteMediaItem(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//       toast.success("Deleted");
//     } catch {
//       toast.error("Failed to delete");
//     }
//   };

//   const handleToggle = async (id) => {
//     try {
//       const updated = await toggleMediaPublished(id);
//       setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
//     } catch {
//       toast.error("Failed to toggle");
//     }
//   };

//   const typeIcon = {
//     youtube: <FaYoutube />,
//     tiktok: <FaTiktok />,
//     instagram: <FaInstagram />,
//     announcement: <FaBullhorn />,
//     poster: <FaImage />,
//   };
//   const typeColor = {
//     youtube: "#dc2626",
//     tiktok: "#111",
//     instagram: "#e1306c",
//     announcement: "#2563eb",
//     poster: "#7c3aed",
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.header}>
//         <div>
//           <h2 className={styles.title}>Media &amp; Announcements</h2>
//           <p className={styles.sub}>
//             Manage videos, social links, announcements and posters shown on the
//             site.
//           </p>
//         </div>
//         <button
//           className={styles.newBtn}
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditing(null);
//             setForm(emptyForm);
//             clearPoster();
//           }}
//         >
//           <FaPlus /> Add Item
//         </button>
//       </div>

//       {showForm && (
//         <form
//           className={styles.form}
//           onSubmit={handleSubmit}
//           encType={form.type === "poster" ? "multipart/form-data" : undefined}
//         >
//           <h3 className={styles.formTitle}>
//             {editing ? "Edit Item" : "Add New Item"}
//           </h3>

//           <div className={styles.formRow}>
//             <div className={styles.field}>
//               <label className={styles.label}>Type</label>
//               <select
//                 className={styles.select}
//                 value={form.type}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, type: e.target.value }))
//                 }
//               >
//                 {TYPES.map((t) => (
//                   <option key={t.key} value={t.key}>
//                     {t.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className={`${styles.field} ${styles.grow}`}>
//               <label className={styles.label}>Title</label>
//               <input
//                 className={styles.input}
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, title: e.target.value }))
//                 }
//                 required
//               />
//             </div>
//           </div>

//           {form.type !== "announcement" && form.type !== "poster" && (
//             <div className={styles.field}>
//               <label className={styles.label}>URL</label>
//               <input
//                 className={styles.input}
//                 placeholder={
//                   form.type === "youtube"
//                     ? "https://youtu.be/..."
//                     : "https://..."
//                 }
//                 value={form.url}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, url: e.target.value }))
//                 }
//                 required
//               />
//             </div>
//           )}

//           {form.type === "poster" && (
//             <div className={styles.field}>
//               <label className={styles.label}>Poster Image</label>
//               {posterPreview ? (
//                 <div className={styles.posterPreviewWrapper}>
//                   <img
//                     src={posterPreview}
//                     alt="Poster preview"
//                     className={styles.posterPreview}
//                   />
//                   <button
//                     type="button"
//                     className={styles.clearPosterBtn}
//                     onClick={clearPoster}
//                     title="Remove image"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   className={styles.dropZone}
//                   onClick={() => fileInputRef.current?.click()}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     const file = e.dataTransfer.files[0];
//                     if (file) handlePosterChange({ target: { files: [file] } });
//                   }}
//                 >
//                   <FaUpload className={styles.dropIcon} />
//                   <span className={styles.dropText}>
//                     Click or drag &amp; drop a poster image
//                   </span>
//                   <span className={styles.dropHint}>
//                     JPG, PNG, WEBP · max 5 MB
//                   </span>
//                 </div>
//               )}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className={styles.hiddenFileInput}
//                 onChange={handlePosterChange}
//               />
//             </div>
//           )}

//           <div className={styles.field}>
//             <label className={styles.label}>
//               {form.type === "announcement" ? "Content" : "Caption (optional)"}
//             </label>
//             <textarea
//               className={styles.textarea}
//               rows={3}
//               placeholder={
//                 form.type === "announcement"
//                   ? "Announcement text…"
//                   : form.type === "poster"
//                     ? "Add a caption for this poster…"
//                     : "Short caption…"
//               }
//               value={form.description}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, description: e.target.value }))
//               }
//             />
//           </div>

//           <div className={styles.formActions}>
//             <label className={styles.checkLabel}>
//               <input
//                 type="checkbox"
//                 checked={form.published}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, published: e.target.checked }))
//                 }
//               />
//               Publish immediately
//             </label>
//             <div className={styles.btnRow}>
//               <button className={styles.saveBtn} type="submit">
//                 {editing ? "Update" : "Create"}
//               </button>
//               <button
//                 className={styles.cancelBtn}
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditing(null);
//                   clearPoster();
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       )}

//       <div className={styles.controls}>
//         <form
//           className={styles.searchRow}
//           onSubmit={(e) => {
//             e.preventDefault();
//             setSearch(searchInput);
//           }}
//         >
//           <div className={styles.searchWrap}>
//             <FaSearch className={styles.searchIcon} />
//             <input
//               className={styles.searchInput}
//               placeholder="Search…"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//           </div>
//           <button className={styles.searchBtn} type="submit">
//             Search
//           </button>
//         </form>

//         <div className={styles.filters}>
//           {["all", ...TYPES.map((t) => t.key)].map((key) => (
//             <button
//               key={key}
//               className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ""}`}
//               onClick={() => {
//                 setFilter(key);
//                 setSearch("");
//                 setSearchInput("");
//               }}
//             >
//               {key === "all" ? "All" : TYPES.find((t) => t.key === key)?.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading ? (
//         <p className={styles.loading}>Loading…</p>
//       ) : items.length === 0 ? (
//         <div className={styles.empty}>No items yet. Add one above.</div>
//       ) : (
//         <div className={styles.list}>
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className={`${styles.row} ${!item.published ? styles.unpublished : ""}`}
//             >
//               {/* ── FIX: resolve thumbnail URL before rendering ── */}
//               {item.type === "poster" && item.thumbnail ? (
//                 <img
//                   src={getImageUrl(item.thumbnail)}
//                   alt={item.title}
//                   className={styles.rowThumbnail}
//                 />
//               ) : (
//                 <div
//                   className={styles.rowIcon}
//                   style={{ color: typeColor[item.type] }}
//                 >
//                   {typeIcon[item.type]}
//                 </div>
//               )}

//               <div className={styles.rowInfo}>
//                 <span className={styles.rowTitle}>{item.title}</span>
//                 {item.url && (
//                   <a
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={styles.rowUrl}
//                   >
//                     {item.url}
//                   </a>
//                 )}
//                 {item.description && (
//                   <span className={styles.rowDesc}>
//                     {item.description.slice(0, 80)}
//                     {item.description.length > 80 ? "…" : ""}
//                   </span>
//                 )}
//               </div>

//               <div className={styles.rowMeta}>
//                 <span
//                   className={`${styles.statusBadge} ${item.published ? styles.pub : styles.draft}`}
//                 >
//                   {item.published ? "Published" : "Draft"}
//                 </span>
//                 <span className={styles.rowDate}>
//                   {new Date(item.created_at).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className={styles.rowActions}>
//                 <button
//                   className={styles.iconBtn}
//                   title={item.published ? "Unpublish" : "Publish"}
//                   onClick={() => handleToggle(item.id)}
//                 >
//                   {item.published ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//                 <button
//                   className={styles.iconBtn}
//                   title="Edit"
//                   onClick={() => handleEdit(item)}
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   className={`${styles.iconBtn} ${styles.danger}`}
//                   title="Delete"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MediaSection;

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
