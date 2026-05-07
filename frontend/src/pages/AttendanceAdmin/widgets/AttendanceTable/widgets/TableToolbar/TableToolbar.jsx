import React, { useState, useEffect } from "react";
import styles from "./TableToolbar.module.css";
import { FaSearch, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

const TableToolbar = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  roles,
  onDownloadCSV,
  onDownloadPDF,
  onShowRange,
  locked,
  familyFilter,
  onFamilyFilterChange,
  groupType,
  meetingPurpose,
  onMeetingPurposeChange,
  meetingActivities,
  onMeetingActivitiesChange,
  purposeSaved,
  onSavePurpose, // optional: async (purpose, activities) => void
}) => {
  const isSCC = groupType === "scc";

  const [editing, setEditing] = useState(false);
  const [draftPurpose, setDraftPurpose] = useState(meetingPurpose || "");
  const [draftActivities, setDraftActivities] = useState(
    meetingActivities || "",
  );
  const [saving, setSaving] = useState(false);

  // When parent loads data (e.g. date change), sync drafts
  useEffect(() => {
    setDraftPurpose(meetingPurpose || "");
    setDraftActivities(meetingActivities || "");
    // If there's no saved purpose yet, open in edit mode automatically
    if (!purposeSaved) setEditing(true);
    else setEditing(false);
  }, [meetingPurpose, meetingActivities, purposeSaved]);

  const handleEdit = () => {
    if (locked) return;
    setDraftPurpose(meetingPurpose || "");
    setDraftActivities(meetingActivities || "");
    setEditing(true);
  };

  const handleSave = async () => {
    if (!draftPurpose.trim()) return;
    setSaving(true);
    try {
      onMeetingPurposeChange(draftPurpose);
      onMeetingActivitiesChange(draftActivities);
      if (onSavePurpose) await onSavePurpose(draftPurpose, draftActivities);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraftPurpose(meetingPurpose || "");
    setDraftActivities(meetingActivities || "");
    setEditing(false);
  };

  // Show view mode only when saved and not currently editing
  const viewMode = purposeSaved && !editing;

  return (
    <div className={styles.toolbar}>
      {/* ── Header ── */}
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.heading}>Attendance Register</h3>
          {locked && (
            <p className={styles.lockedNotice}>
              🔒 Locked — more than 12 hours since this date was saved.
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button className={styles.rangeBtn} onClick={onShowRange}>
            ↓ Range Report
          </button>
          <button className={styles.downloadBtn} onClick={onDownloadCSV}>
            ↓ CSV
          </button>
          <button className={styles.downloadBtn} onClick={onDownloadPDF}>
            ↓ PDF
          </button>
        </div>
      </div>

      {/* ── Meeting Details ── */}
      <div className={styles.purposeSection}>
        <div className={styles.purposeSectionHeader}>
          <span className={styles.purposeSectionTitle}>📋 Meeting Details</span>

          <div className={styles.purposeHeaderRight}>
            {purposeSaved && !editing && (
              <span className={styles.savedBadge}>✓ Saved</span>
            )}
            {viewMode && !locked && (
              <button
                className={styles.editBtn}
                onClick={handleEdit}
                disabled={saving}
                title="Edit meeting details"
              >
                {saving ? (
                  <span className={styles.editSpinner} />
                ) : (
                  <FaPencilAlt size={10} />
                )}
                Edit
              </button>
            )}
          </div>
        </div>

        {/* VIEW MODE */}
        {viewMode ? (
          <div className={styles.purposeViewRow}>
            <div className={styles.purposeViewField}>
              <span className={styles.purposeViewLabel}>Purpose</span>
              <p className={styles.purposeViewText}>
                {meetingPurpose || (
                  <em className={styles.emptyText}>Not set</em>
                )}
              </p>
            </div>
            {meetingActivities && (
              <div className={styles.purposeViewField}>
                <span className={styles.purposeViewLabel}>Activities</span>
                <p className={styles.purposeViewText}>{meetingActivities}</p>
              </div>
            )}
          </div>
        ) : (
          /* EDIT MODE */
          <div className={styles.purposeEditBlock}>
            <div className={styles.purposeRow}>
              <div className={styles.purposeField}>
                <label className={styles.purposeLabel}>
                  Purpose of Meeting <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={`${styles.purposeTextarea} ${
                    !draftPurpose.trim() ? styles.purposeTextareaEmpty : ""
                  }`}
                  placeholder="e.g. Weekly fellowship and prayer session…"
                  value={draftPurpose}
                  onChange={(e) => setDraftPurpose(e.target.value)}
                  disabled={locked}
                  rows={3}
                  autoFocus={purposeSaved} // only autofocus when re-editing
                />
              </div>
              <div className={styles.purposeField}>
                <label className={styles.purposeLabel}>Activities Done</label>
                <textarea
                  className={styles.purposeTextarea}
                  placeholder="e.g. Bible study, worship, announcements…"
                  value={draftActivities}
                  onChange={(e) => setDraftActivities(e.target.value)}
                  disabled={locked}
                  rows={3}
                />
              </div>
            </div>

            {!locked && (
              <div className={styles.purposeEditActions}>
                <button
                  className={styles.saveDetailsBtn}
                  onClick={handleSave}
                  disabled={saving || !draftPurpose.trim()}
                >
                  {saving ? (
                    <span className={styles.btnSpinner} />
                  ) : (
                    <FaCheck size={11} />
                  )}
                  {saving ? "Saving…" : "Save Details"}
                </button>
                {purposeSaved && (
                  <button
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    <FaTimes size={11} />
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search member..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {isSCC && (
          <input
            className={styles.familyInput}
            placeholder="Filter by family name…"
            value={familyFilter}
            onChange={(e) => onFamilyFilterChange(e.target.value)}
          />
        )}
        <select
          className={styles.roleFilter}
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableToolbar;
