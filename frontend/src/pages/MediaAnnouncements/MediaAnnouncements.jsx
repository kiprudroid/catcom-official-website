import React, { useState, useEffect, useCallback } from "react";
import styles from "./MediaAnnouncements.module.css";
import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";
import { fetchPublicMedia } from "@/api/media.api";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaBullhorn,
  FaImage,
  FaSearch,
} from "react-icons/fa";
import { MediaGrid, Loading, EmptyState } from "./widgets";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "youtube", label: "YouTube", icon: <FaYoutube /> },
  { key: "announcement", label: "Announcements", icon: <FaBullhorn /> },
  { key: "tiktok", label: "TikTok", icon: <FaTiktok /> },
  { key: "instagram", label: "Instagram", icon: <FaInstagram /> },
  { key: "poster", label: "Poster", icon: <FaImage /> },
];

function MediaAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setSearch("");
    setInputValue("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputValue);
  };

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <section className={styles.hero}>
          <span className={styles.heroBadge}>STAY CONNECTED</span>
          <h1 className={styles.heroTitle}>
            Media &amp; <span className={styles.heroAccent}>Announcements</span>
          </h1>
          <p className={styles.heroSub}>
            Videos, posters, news and updates from the JKUAT Catholic Community.
          </p>

          <form className={styles.searchRow} onSubmit={handleSearch}>
            <div className={styles.searchWrap}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search videos, announcements..."
                className={styles.searchInput}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </form>
        </section>

        <section className={styles.filterBar}>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`${styles.pill} ${
                  activeFilter === f.key ? styles.pillActive : ""
                }`}
                onClick={() => handleFilterChange(f.key)}
              >
                {f.icon && <span className={styles.pillIcon}>{f.icon}</span>}
                {f.label}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.content}>
          {loading && <Loading />}

          {!loading && items.length === 0 && (
            <EmptyState type={activeFilter} search={search} />
          )}

          {!loading && items.length > 0 && (
            <>
              <p className={styles.resultCount}>
                {items.length} item{items.length !== 1 ? "s" : ""}
                {activeFilter !== "all" ? ` · ${activeFilter}` : ""}
                {search ? ` matching "${search}"` : ""}
              </p>
              <MediaGrid items={items} />
            </>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default MediaAnnouncements;
