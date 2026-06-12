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

const slideShowImages = [
  "/home-hero-images/hero1.jpeg",
  "/home-hero-images/hero2.jpeg",
  "/home-hero-images/hero3.jpeg",
  "/home-hero-images/hero4.jpeg",
  "/home-hero-images/hero5.jpeg",
  "/home-hero-images/hero6.jpeg",
  "/home-hero-images/hero7.jpeg",
  "/home-hero-images/hero8.jpeg",
];

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
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

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
    const timer = setTimeout(() => setSearch(inputValue), 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slideShowImages.length);
        setVisible(true);
      }, 600);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
          {/* slideshow */}
          <div
            className={`${styles.slideBg} ${visible ? styles.slideVisible : styles.slideHidden}`}
            style={{ backgroundImage: `url(${slideShowImages[current]})` }}
            aria-hidden="true"
          />
          <div className={styles.slideOverlay} aria-hidden="true" />

          {/* content */}
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

        {/* rest unchanged */}
        <section className={styles.filterBar}>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`${styles.pill} ${activeFilter === f.key ? styles.pillActive : ""}`}
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
