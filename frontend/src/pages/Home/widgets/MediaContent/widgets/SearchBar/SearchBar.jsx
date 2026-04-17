import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const clear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form className={styles.searchRow} onSubmit={handleSubmit}>
      <div className={styles.searchWrap}>
        <FaSearch className={styles.searchIcon} />

        <input
          className={styles.searchInput}
          value={value}
          placeholder="Search videos, announcements…"
          onChange={(e) => setValue(e.target.value)}
        />

        {value && (
          <button type="button" className={styles.clearBtn} onClick={clear}>
            <FaTimes />
          </button>
        )}
      </div>

      <button className={styles.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
