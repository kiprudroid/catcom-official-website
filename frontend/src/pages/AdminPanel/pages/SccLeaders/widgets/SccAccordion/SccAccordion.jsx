import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaUserTie,
  FaRegBuilding,
  FaBriefcase,
  FaChevronDown,
  FaSpinner,
} from "react-icons/fa";
import { GiAngelWings } from "react-icons/gi";
import { BACKEND_URL } from "@/data/urlClient";
import styles from "./SccAccordion.module.css";

const cathedralImg = "/cathedral.jpg";
const VARIANTS = [
  {
    accent: "#c8a96e",
    glow: "rgba(200,169,110,0.35)",
    tint: "rgba(30,18,6,0.55)",
  },
  {
    accent: "#a87ca0",
    glow: "rgba(168,124,160,0.35)",
    tint: "rgba(20,8,22,0.58)",
  },
  {
    accent: "#7ca8c8",
    glow: "rgba(124,168,200,0.35)",
    tint: "rgba(6,18,30,0.55)",
  },
  {
    accent: "#7ca87c",
    glow: "rgba(124,168,124,0.35)",
    tint: "rgba(6,24,6,0.55)",
  },
  {
    accent: "#c87c7c",
    glow: "rgba(200,124,124,0.35)",
    tint: "rgba(30,6,6,0.58)",
  },
  {
    accent: "#c8b47c",
    glow: "rgba(200,180,124,0.35)",
    tint: "rgba(28,20,4,0.55)",
  },
  {
    accent: "#8c9ec8",
    glow: "rgba(140,158,200,0.35)",
    tint: "rgba(10,12,30,0.57)",
  },
];

export default function SccAccordion({
  sccOptions,
  leaders,
  searchTerm,
  editSpinnerId,
  onEdit,
  onDelete,
}) {
  const [openScc, setOpenScc] = useState(null);

  const normalize = (s) =>
    String(s || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const toggle = (value) =>
    setOpenScc((prev) => (prev === value ? null : value));

  return (
    <div className={styles.accordion}>
      {sccOptions
        .filter((o) => o.value !== "all")
        .map((scc, idx) => {
          const filtered = leaders.filter((l) => {
            const matchScc = normalize(l.scc_name) === normalize(scc.value);
            const matchSearch = normalize(l.exec_full_name).includes(
              normalize(searchTerm),
            );
            return matchScc && matchSearch;
          });

          const isOpen = openScc === scc.value;
          const v = VARIANTS[idx % VARIANTS.length];

          return (
            <div
              key={scc.value}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              style={{ "--accent": v.accent, "--glow": v.glow }}
            >
              <button
                type="button"
                className={styles.panelHeader}
                onClick={() => toggle(scc.value)}
                aria-expanded={isOpen}
              >
                <div
                  className={styles.headerBg}
                  style={{ backgroundImage: `url(${cathedralImg})` }}
                />
                <div
                  className={styles.headerTint}
                  style={{ background: v.tint }}
                />
                <div className={styles.headerContent}>
                  <div className={styles.panelLeft}>
                    <span className={styles.saintIcon}>
                      <GiAngelWings style={{ color: v.accent }} />
                    </span>
                    <span className={styles.panelTitle}>{scc.label}</span>
                    <span
                      className={styles.count}
                      style={{ borderColor: v.accent, color: v.accent }}
                    >
                      {filtered.length}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    style={isOpen ? { color: v.accent } : {}}
                  />
                </div>
              </button>

              {isOpen && (
                <ul className={styles.list}>
                  {filtered.length === 0 ? (
                    <li className={styles.empty}>No leaders found.</li>
                  ) : (
                    filtered.map((l) => (
                      <li key={l.exec_id} className={styles.listItem}>
                        <div className={styles.listRow}>
                          <div className={styles.listLeft}>
                            {l.exec_image ? (
                              <img
                                src={`${BACKEND_URL}${l.exec_image}`}
                                alt={l.exec_full_name || "leader"}
                                className={styles.avatar}
                                style={{ borderColor: v.accent }}
                              />
                            ) : (
                              <div
                                className={styles.avatarFallback}
                                style={{
                                  borderColor: v.accent,
                                  color: v.accent,
                                }}
                              >
                                <FaUserTie />
                              </div>
                            )}
                            <div className={styles.cardContent}>
                              <div className={styles.cardName}>
                                {l.exec_full_name}
                              </div>
                              <div className={styles.badges}>
                                <span className={styles.badge}>
                                  <FaBriefcase />
                                  {l.position}
                                </span>
                                <span className={styles.badgeAlt}>
                                  <FaRegBuilding />
                                  {l.scc_name}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className={styles.actions}>
                            <button
                              type="button"
                              className={styles.editBtn}
                              style={{
                                background: `linear-gradient(135deg, ${v.accent}cc, ${v.accent})`,
                              }}
                              onClick={() => onEdit(l)}
                            >
                              {editSpinnerId === l.exec_id ? (
                                <FaSpinner className={styles.spinner} />
                              ) : (
                                <FaEdit />
                              )}
                              Edit
                            </button>
                            <button
                              type="button"
                              className={styles.deleteBtn}
                              onClick={() => onDelete(l.exec_id)}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          );
        })}
    </div>
  );
}
