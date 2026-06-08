import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MediaContent.module.css";
import { FaArrowRight } from "react-icons/fa";
import { fetchPublicMedia } from "@/api/media.api";
import { Loading, EmptyState, MediaGrid } from "./widgets";

const MediaContent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={styles.wrapper}>
      {/* ── Section heading ── */}
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

      {/* ── Cards ── */}
      {loading && <Loading />}
      {!loading && items.length === 0 && <EmptyState type="all" />}
      {!loading && items.length > 0 && <MediaGrid items={items} />}

      {/* ── View All — bottom center ── */}
      {!loading && items.length > 0 && (
        <div className={styles.viewAllWrap}>
          <NavLink to="/media" className={styles.viewAllLink}>
            View All Media &amp; Announcements
            <FaArrowRight className={styles.arrowIcon} />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MediaContent;
