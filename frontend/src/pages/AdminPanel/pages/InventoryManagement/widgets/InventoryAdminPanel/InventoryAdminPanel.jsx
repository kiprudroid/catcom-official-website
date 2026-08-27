import React from "react";
import styles from "./InventoryAdminPanel.module.css";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";

const InventoryAdminPanel = ({
  groupId,
  admins,
  adminForm,
  showPasswords,
  onFormChange,
  onTogglePassword,
  onCreateAdmin,
  onUpdatePassword,
  onDeleteAdmin,
  adminSaving,
  windowForm,
  onWindowChange,
  onWindowSave,
  groupType,
}) => {
  const isScc = groupType === "scc";
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Inventory Admin Access (M:N)</h4>
      {admins && admins.length > 0 ? (
        <div>
          {admins.map((a) => (
            <div key={a.id} className={styles.emailRow}>
              <span className={styles.emailValue}>{a.email} {a.full_name && `— ${a.full_name}`}</span>
              <span className={styles.emailLabel}>{new Date(a.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          <div className={styles.formRow}>
            <div className={styles.pwWrap}>
              <input
                className={styles.input}
                type={showPasswords[`update_${groupId}`] ? "text" : "password"}
                placeholder="New password (min 6)"
                value={adminForm.password || ""}
                onChange={(e) => onFormChange(groupId, "password", e.target.value)}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => onTogglePassword(`update_${groupId}`)}>
                {showPasswords[`update_${groupId}`] ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button className={styles.saveBtn} type="button" onClick={() => onUpdatePassword(groupId)} disabled={adminSaving === "updating"}>
              {adminSaving === "updating" ? "Updating…" : "Update Password"}
            </button>
            <button className={styles.dangerBtn} type="button" onClick={() => onDeleteAdmin(groupId)}><FaTrash /> Revoke All</button>
          </div>
          <p className={styles.hint}>This group has {admins.length} inventory account(s). To grant additional groups to an admin, use the multi-group section below.</p>
        </div>
      ) : (
        <div>
          <p className={styles.noAdmin}>No inventory admin yet. Create one:</p>
          <div className={styles.formRow}>
            <input className={styles.input} type="text" placeholder="Full name (optional)" value={adminForm.full_name || ""} onChange={(e) => onFormChange(groupId, "full_name", e.target.value)} />
            <input className={styles.input} type="email" placeholder="Admin email" value={adminForm.email || ""} onChange={(e) => onFormChange(groupId, "email", e.target.value)} />
            <div className={styles.pwWrap}>
              <input className={styles.input} type={showPasswords[`new_${groupId}`] ? "text" : "password"} placeholder="Password (min 6)" value={adminForm.password || ""} onChange={(e) => onFormChange(groupId, "password", e.target.value)} />
              <button type="button" className={styles.eyeBtn} onClick={() => onTogglePassword(`new_${groupId}`)}>{showPasswords[`new_${groupId}`] ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <button className={styles.saveBtn} type="button" onClick={() => onCreateAdmin(groupId)} disabled={adminSaving === "creating"}>
              {adminSaving === "creating" ? "Creating…" : "Create Account"}
            </button>
          </div>
        </div>
      )}

      {isScc && (
        <div className={styles.windowSection}>
          <h5 className={styles.windowTitle}>SCC Edit Window (regime gate)</h5>
          <p className={styles.hint}>SCC inventory only editable when window is open.</p>
          <div className={styles.formRow}>
            <input className={styles.input} type="date" value={windowForm.window_start ? String(windowForm.window_start).slice(0, 10) : ""} onChange={(e) => onWindowChange("window_start", e.target.value)} />
            <input className={styles.input} type="date" value={windowForm.window_end ? String(windowForm.window_end).slice(0, 10) : ""} onChange={(e) => onWindowChange("window_end", e.target.value)} />
            <label className={styles.check}><input type="checkbox" checked={!!windowForm.is_open} onChange={(e) => onWindowChange("is_open", e.target.checked)} /> Open</label>
            <button className={styles.saveBtn} onClick={onWindowSave}>Save Window</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryAdminPanel;
