import React, { useState } from "react";
import styles from "./MediaControls.module.css";
import { FaSearch } from "react-icons/fa";

const TYPES = [
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "instagram", label: "Instagram" },
  { key: "announcement", label: "Announcement" },
  { key: "poster", label: "Poster" },
];

const MediaControls = ({ filter, onFilterChange, onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleFilterClick = (key) => {
    onFilterChange(key);
    setSearchInput("");
    onSearch("");
  };

  return (
    <div className={styles.controls}>
      <form className={styles.searchRow} onSubmit={handleSearch}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>

      <div className={styles.filters}>
        {["all", ...TYPES.map((t) => t.key)].map((key) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ""}`}
            onClick={() => handleFilterClick(key)}
          >
            {key === "all" ? "All" : TYPES.find((t) => t.key === key)?.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MediaControls;
