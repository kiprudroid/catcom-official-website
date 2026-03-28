// import React from "react";
// import styles from "./MediaContent.module.css";
// import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
// import { FaYoutube } from "react-icons/fa";

// const mediaItems = [
//   {
//     type: "video",
//     url: "https://youtu.be/2POCPrNa-do?si=WSkbsUQKdVhXE_PM",
//     title: "KMRM Choir – Tunakushukuru By J. Anari ",
//   },
//   {
//     type: "video",
//     url: "https://youtu.be/ze9bEKCiNKk?si=GVR843V_N9BpZTgb",
//     title: "CATCOM KMRM Liturgical Dancers – Serebuka By J.Anari",
//   },
//   {
//     type: "video",
//     url: "https://youtu.be/X2JpwESCYcI?si=k5H_V-o4nHaeXtkv",
//     title: "KMRM Choir - Mtu na Mwenzake By Abel Wafula",
//   },
// ];

// const MediaContent = () => {
//   const toEmbedUrl = (url) => {
//     if (url.includes("youtu.be")) {
//       const videoId = url.split("youtu.be/")[1].split("?")[0];
//       return `https://www.youtube.com/embed/${videoId}`;
//     }
//     if (url.includes("watch?v=")) {
//       const videoId = url.split("watch?v=")[1].split("&")[0];
//       return `https://www.youtube.com/embed/${videoId}`;
//     }
//     return url;
//   };

//   return (
//     <div className={styles.card}>
//       <SectionHeading as="h3" className={styles.cardTitle}>
//         Media Content
//       </SectionHeading>

//       <div className={styles.mediaWrapper}>
//         {mediaItems.map((item, index) => (
//           <div key={index} className={styles.videoCard}>
//             <div className={styles.videoWrapper}>
//               <iframe
//                 src={toEmbedUrl(item.url)}
//                 title={item.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//             <Paragraph className={styles.videoTitle}>
//               <FaYoutube className={styles.youtubeIcon} /> {item.title}
//             </Paragraph>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MediaContent;

import React, { useState, useEffect, useCallback } from "react";
import styles from "./MediaContent.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaBullhorn,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { fetchPublicMedia } from "@/api/media.api";

const FILTERS = [
  { key: "all", label: "All", icon: null },
  { key: "youtube", label: "Videos", icon: <FaYoutube /> },
  { key: "announcement", label: "Announcements", icon: <FaBullhorn /> },
  { key: "tiktok", label: "TikTok", icon: <FaTiktok /> },
  { key: "instagram", label: "Instagram", icon: <FaInstagram /> },
];

const toEmbedUrl = (url) => {
  if (!url) return null;
  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

const typeIcon = {
  youtube: <FaYoutube className={styles.typeIconYt} />,
  tiktok: <FaTiktok className={styles.typeIconTt} />,
  instagram: <FaInstagram className={styles.typeIconIg} />,
  announcement: <FaBullhorn className={styles.typeIconAn} />,
};

const MediaCard = ({ item }) => {
  if (item.type === "youtube") {
    return (
      <div className={styles.card}>
        <div className={styles.videoWrapper}>
          <iframe
            src={toEmbedUrl(item.url)}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.typeBadge} data-type="youtube">
            {typeIcon.youtube} YouTube
          </span>
          <p className={styles.cardTitle}>{item.title}</p>
          {item.description && (
            <p className={styles.cardDesc}>{item.description}</p>
          )}
        </div>
      </div>
    );
  }

  if (item.type === "announcement") {
    return (
      <div className={`${styles.card} ${styles.announcementCard}`}>
        <div className={styles.announcementHeader}>
          <FaBullhorn className={styles.announcementIcon} />
          <span className={styles.typeBadge} data-type="announcement">
            Announcement
          </span>
        </div>
        <p className={styles.announcementTitle}>{item.title}</p>
        {item.description && (
          <p className={styles.announcementBody}>{item.description}</p>
        )}
        <span className={styles.announcementDate}>
          {new Date(item.created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    );
  }

  // TikTok / Instagram — link card
  const platformIcon =
    item.type === "tiktok" ? typeIcon.tiktok : typeIcon.instagram;
  const platformLabel = item.type === "tiktok" ? "TikTok" : "Instagram";
  const platformColor = item.type === "tiktok" ? "#010101" : "#e1306c";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${styles.linkCard}`}
      style={{ "--platform-color": platformColor }}
    >
      <div className={styles.linkCardIcon}>{platformIcon}</div>
      <div className={styles.cardBody}>
        <span className={styles.typeBadge} data-type={item.type}>
          {platformIcon} {platformLabel}
        </span>
        <p className={styles.cardTitle}>{item.title}</p>
        {item.description && (
          <p className={styles.cardDesc}>{item.description}</p>
        )}
        <span className={styles.linkHint}>Tap to open ↗</span>
      </div>
    </a>
  );
};

const MediaContent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPublicMedia({ type: activeFilter, search });
      setItems(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  return (
    <div className={styles.wrapper}>
      <SectionHeading as="h3" className={styles.title}>
        Media &amp; Announcements
      </SectionHeading>

      {/* Search */}
      <form className={styles.searchRow} onSubmit={handleSearch}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search videos, announcements…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={clearSearch}
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>

      {/* Filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ""}`}
            onClick={() => {
              setActiveFilter(f.key);
              setSearch("");
              setSearchInput("");
            }}
          >
            {f.icon && <span>{f.icon}</span>}
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          No {activeFilter === "all" ? "media" : activeFilter} content yet.
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaContent;
