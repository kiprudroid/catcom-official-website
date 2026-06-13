import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MediaContent.module.css";
import { FaArrowRight } from "react-icons/fa";
import { fetchPublicMedia } from "@/api/media.api";
import { Loading, EmptyState, MediaGrid } from "./widgets";

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

const MediaContent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPublicMedia({ type: "all", search: "" });
      const sorted = [...data]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);
      setItems(sorted);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  const handleViewAll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/media");
  };

  return (
    <div className={styles.wrapper}>
      {/* ── Slideshow heading block ── */}
      <div className={styles.heroBlock}>
        <div
          className={`${styles.slideBg} ${visible ? styles.slideVisible : styles.slideHidden}`}
          style={{ backgroundImage: `url(${slideShowImages[current]})` }}
          aria-hidden="true"
        />
        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.headingBlock}>
          <span className={styles.eyebrow}>STAY CONNECTED</span>
          <h2 className={styles.title}>
            Latest <span className={styles.titleAccent}>Media</span> &amp;
            Announcements
          </h2>
          <p className={styles.subtitle}>
            Videos, posters and updates from the JKUAT Catholic Community.
          </p>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className={styles.gridWrap}>
        {loading && <Loading />}
        {!loading && items.length === 0 && <EmptyState type="all" />}
        {!loading && items.length > 0 && <MediaGrid items={items} />}
      </div>

      {/* ── View All ── */}
      {!loading && items.length > 0 && (
        <div className={styles.viewAllWrap}>
          <NavLink
            to="/media"
            className={styles.viewAllLink}
            onClick={handleViewAll}
          >
            View All Media &amp; Announcements
            <FaArrowRight className={styles.arrowIcon} />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MediaContent;
