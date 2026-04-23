import React, { useState, useEffect, useCallback } from "react";
import styles from "./MediaContent.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaBullhorn,
  FaImage,
} from "react-icons/fa";
import { fetchPublicMedia } from "@/api/media.api";
import { SearchBar, Filters, Loading, EmptyState, MediaGrid } from "./widgets";

const FILTERS = [
  { key: "all", label: "All", icon: null },
  { key: "youtube", label: "YouTube", icon: <FaYoutube /> },
  { key: "announcement", label: "Announcements", icon: <FaBullhorn /> },
  { key: "tiktok", label: "TikTok", icon: <FaTiktok /> },
  { key: "instagram", label: "Instagram", icon: <FaInstagram /> },
  { key: "poster", label: "Poster", icon: <FaImage /> },
];

const MediaContent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPublicMedia({ type: activeFilter, search });
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setItems(sorted);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setSearch("");
  };

  return (
    <div className={styles.wrapper}>
      <SectionHeading as="h3" className={styles.title}>
        Media &amp; Announcements
      </SectionHeading>

      <SearchBar onSearch={setSearch} />

      <Filters
        filters={FILTERS}
        activeFilter={activeFilter}
        onChange={handleFilterChange}
      />

      {loading && <Loading />}

      {!loading && items.length === 0 && <EmptyState type={activeFilter} />}

      {!loading && items.length > 0 && <MediaGrid items={items} />}
    </div>
  );
};

export default MediaContent;
