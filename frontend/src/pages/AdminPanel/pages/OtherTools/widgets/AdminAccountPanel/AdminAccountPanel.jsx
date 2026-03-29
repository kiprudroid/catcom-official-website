import React from "react";
import styles from "./AdminAccountPanel.module.css";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";

const AdminAccountPanel = ({
  groupId,
  admin,
  adminForm,
  showPasswords,
  onFormChange,
  onTogglePassword,
  onCreateAdmin,
  onUpdatePassword,
  onDeleteAdmin,
}) => {
  const showNewPw = showPasswords[`new_${groupId}`];
  const showUpdatePw = showPasswords[`update_${groupId}`];

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Admin Account</h4>

      {admin ? (
        <div>
          <div className={styles.emailRow}>
            <span className={styles.emailLabel}>Email:</span>
            <span className={styles.emailValue}>{admin.email}</span>
          </div>
          <div className={styles.formRow}>
            <div className={styles.pwWrap}>
              <input
                className={styles.input}
                type={showUpdatePw ? "text" : "password"}
                placeholder="New password (min 6 chars)"
                value={adminForm.password}
                onChange={(e) =>
                  onFormChange(groupId, "password", e.target.value)
                }
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => onTogglePassword(`update_${groupId}`)}
              >
                {showUpdatePw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              className={styles.saveBtn}
              type="button"
              onClick={() => onUpdatePassword(groupId)}
              disabled={!adminForm.password}
            >
              Update Password
            </button>
            <button
              className={styles.dangerBtn}
              type="button"
              onClick={() => onDeleteAdmin(groupId)}
            >
              <FaTrash /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className={styles.noAdmin}>No admin account yet. Create one:</p>
          <div className={styles.formRow}>
            <input
              className={styles.input}
              type="email"
              placeholder="Admin email"
              value={adminForm.email}
              onChange={(e) => onFormChange(groupId, "email", e.target.value)}
            />
            <div className={styles.pwWrap}>
              <input
                className={styles.input}
                type={showNewPw ? "text" : "password"}
                placeholder="Password (min 6 chars)"
                value={adminForm.password}
                onChange={(e) =>
                  onFormChange(groupId, "password", e.target.value)
                }
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => onTogglePassword(`new_${groupId}`)}
              >
                {showNewPw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              className={styles.saveBtn}
              type="button"
              onClick={() => onCreateAdmin(groupId)}
              disabled={!adminForm.email || !adminForm.password}
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccountPanel;
