import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./MemberDetailModal.module.css";

const PENDING_PREFIX = "PENDING: ";

function stripPending(v) {
  return typeof v === "string" && v.startsWith(PENDING_PREFIX)
    ? v.slice(PENDING_PREFIX.length)
    : v;
}

function getDisplayName(m) {
  return m.full_name || m.name || "";
}

function getGroups(m) {
  return m.group_joined
    ? stripPending(m.group_joined)
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
    : [];
}

function getScc(m) {
  return m.scc_name && m.scc_name !== "TBD" ? m.scc_name : null;
}

function getFields(m) {
  const fields = [];
  if (m.phone_number)
    fields.push({
      label: "PHONE",
      value: m.phone_number,
      href: `tel:${m.phone_number}`,
    });
  if (m.email)
    fields.push({ label: "EMAIL", value: m.email, href: `mailto:${m.email}` });
  if (m.year_study)
    fields.push({ label: "YEAR OF STUDY", value: `Year ${m.year_study}` });
  if (m.gender) fields.push({ label: "GENDER", value: m.gender });
  if (m.college) fields.push({ label: "COLLEGE", value: m.college });
  if (m.note) fields.push({ label: "REQUEST", value: m.note });
  return fields;
}

function buildMemberText(m) {
  const lines = [`Name: ${getDisplayName(m)}`];
  getFields(m).forEach((f) => lines.push(`${f.label}: ${f.value}`));
  const groups = getGroups(m);
  const scc = getScc(m);
  if (groups.length) lines.push(`Group(s): ${groups.join(", ")}`);
  if (scc) lines.push(`SCC: ${scc}`);
  return lines.join("\n");
}

function buildWhatsAppMessage(m) {
  const scc = getScc(m);
  const groups = getGroups(m);
  const intro = scc
    ? `Hey there! Kindly add this person to your SCC (${scc}):`
    : groups.length
      ? `Hey there! Kindly add this person to your group (${groups.join(", ")}):`
      : `Hey there! Kindly add this person:`;

  return `${intro}\n\n${buildMemberText(m)}`;
}

export default function MemberDetailModal({ member, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!member) return null;

  const name = getDisplayName(member);
  const groups = getGroups(member);
  const scc = getScc(member);

  const handleCopy = () => {
    navigator.clipboard.writeText(buildMemberText(member)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(buildWhatsAppMessage(member))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.avatar}>{name.charAt(0).toUpperCase()}</div>
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.tags}>
          {scc && <span className={styles.sccTag}>{scc}</span>}
          {groups.map((g) => (
            <span key={g} className={styles.groupTag}>
              {g}
            </span>
          ))}
        </div>

        <div className={styles.details}>
          {getFields(member).map((f) => (
            <div className={styles.detailRow} key={f.label}>
              <span className={styles.label}>{f.label}</span>
              {f.href ? (
                <a href={f.href} className={styles.link}>
                  {f.value}
                </a>
              ) : (
                <span className={styles.value}>{f.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? "✓ Copied!" : "📋 Copy Details"}
          </button>
          <button className={styles.whatsappBtn} onClick={handleWhatsAppShare}>
            <FaWhatsapp size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
