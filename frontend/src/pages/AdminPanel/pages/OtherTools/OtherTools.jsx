import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OtherTools.module.css";
import toast from "react-hot-toast";
import {
  FaClipboardList,
  FaExternalLinkAlt,
  FaPlus,
  FaTrash,
  FaEdit,
  FaKey,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  fetchAttendanceGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  createGroupAdmin,
  updateGroupAdminPassword,
  deleteGroupAdmin,
  fetchGroupAdmin,
} from "@/api/attendance.api";

const GROUP_TYPES = ["committee", "scc", "pastoral", "other"];

const emptyGroupForm = { name: "", type: "committee" };
const emptyAdminForm = { email: "", password: "" };

const OtherTools = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupForm, setGroupForm] = useState(emptyGroupForm);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [adminForms, setAdminForms] = useState({}); // keyed by group_id
  const [groupAdmins, setGroupAdmins] = useState({}); // keyed by group_id
  const navigate = useNavigate();

  const loadGroups = async () => {
    try {
      const data = await fetchAttendanceGroups();
      setGroups(data);
    } catch {
      toast.error("Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroupAdmin = async (group_id) => {
    try {
      const admin = await fetchGroupAdmin(group_id);
      setGroupAdmins((prev) => ({ ...prev, [group_id]: admin }));
    } catch {
      setGroupAdmins((prev) => ({ ...prev, [group_id]: null }));
    }
  };

  const handleExpandGroup = (group_id) => {
    if (expandedGroup === group_id) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(group_id);
      loadGroupAdmin(group_id);
    }
  };

  // ── Group CRUD ──────────────────────────────────────────────────

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGroup) {
        const updated = await updateGroup(editingGroup.id, groupForm);
        setGroups((prev) =>
          prev.map((g) => (g.id === updated.id ? updated : g)),
        );
        toast.success("Group updated");
      } else {
        const newGroup = await createGroup(groupForm);
        setGroups((prev) => [...prev, newGroup]);
        toast.success("Group created");
      }
      setGroupForm(emptyGroupForm);
      setEditingGroup(null);
      setShowGroupForm(false);
    } catch {
      toast.error("Failed to save group");
    }
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setGroupForm({ name: group.name, type: group.type });
    setShowGroupForm(true);
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm("Delete this group and all its members/records?"))
      return;
    try {
      await deleteGroup(id);
      setGroups((prev) => prev.filter((g) => g.id !== id));
      toast.success("Group deleted");
    } catch {
      toast.error("Failed to delete group");
    }
  };

  // ── Admin account CRUD ──────────────────────────────────────────

  const handleAdminFormChange = (group_id, field, value) => {
    setAdminForms((prev) => ({
      ...prev,
      [group_id]: { ...(prev[group_id] || emptyAdminForm), [field]: value },
    }));
  };

  const handleCreateAdmin = async (group_id) => {
    const form = adminForms[group_id] || {};
    try {
      const admin = await createGroupAdmin(group_id, {
        email: form.email,
        password: form.password,
      });
      setGroupAdmins((prev) => ({ ...prev, [group_id]: admin }));
      setAdminForms((prev) => ({ ...prev, [group_id]: emptyAdminForm }));
      toast.success("Admin account created");
    } catch {
      toast.error("Failed to create admin account");
    }
  };

  const handleUpdatePassword = async (group_id) => {
    const form = adminForms[group_id] || {};
    try {
      await updateGroupAdminPassword(group_id, form.password);
      setAdminForms((prev) => ({
        ...prev,
        [group_id]: { ...prev[group_id], password: "" },
      }));
      toast.success("Password updated");
    } catch {
      toast.error("Failed to update password");
    }
  };

  const handleDeleteAdmin = async (group_id) => {
    if (!window.confirm("Remove admin account for this group?")) return;
    try {
      await deleteGroupAdmin(group_id);
      setGroupAdmins((prev) => ({ ...prev, [group_id]: null }));
      toast.success("Admin account removed");
    } catch {
      toast.error("Failed to remove admin account");
    }
  };

  if (loading) return <p className={styles.loading}>Loading groups…</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Other Admin Tools</h2>
          <p className={styles.sub}>
            Manage attendance groups. Each group has its own login and member
            list.
          </p>
        </div>
        <button
          className={styles.newBtn}
          onClick={() => {
            setShowGroupForm(!showGroupForm);
            setEditingGroup(null);
            setGroupForm(emptyGroupForm);
          }}
        >
          <FaPlus /> New Group
        </button>
      </div>

      {/* ── Create/Edit group form ─────────────────────────────── */}
      {showGroupForm && (
        <form className={styles.groupForm} onSubmit={handleGroupSubmit}>
          <h3 className={styles.formTitle}>
            {editingGroup ? "Edit Group" : "Create New Group"}
          </h3>
          <div className={styles.formRow}>
            <input
              className={styles.input}
              placeholder="Group name (e.g. Welfare Committee)"
              value={groupForm.name}
              onChange={(e) =>
                setGroupForm((p) => ({ ...p, name: e.target.value }))
              }
              required
            />
            <select
              className={styles.select}
              value={groupForm.type}
              onChange={(e) =>
                setGroupForm((p) => ({ ...p, type: e.target.value }))
              }
            >
              {GROUP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
            <button className={styles.saveBtn} type="submit">
              {editingGroup ? "Update" : "Create"}
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={() => {
                setShowGroupForm(false);
                setEditingGroup(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ── Groups list ───────────────────────────────────────────── */}
      {groups.length === 0 ? (
        <div className={styles.empty}>
          No groups yet. Create one above to get started.
        </div>
      ) : (
        <div className={styles.groupList}>
          {groups.map((group) => {
            const isExpanded = expandedGroup === group.id;
            const admin = groupAdmins[group.id];
            const adminForm = adminForms[group.id] || emptyAdminForm;

            return (
              <div key={group.id} className={styles.groupCard}>
                {/* Group header row */}
                <div className={styles.groupRow}>
                  <div className={styles.groupIcon}>
                    <FaClipboardList />
                  </div>
                  <div className={styles.groupInfo}>
                    <span className={styles.groupName}>{group.name}</span>
                    <div className={styles.groupMeta}>
                      <span
                        className={`${styles.typePill} ${styles[group.type]}`}
                      >
                        {group.type}
                      </span>
                      <span className={styles.memberCount}>
                        {group.member_count || 0} members
                      </span>
                      {group.admin_email && (
                        <span className={styles.adminEmail}>
                          {group.admin_email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.groupActions}>
                    <button
                      className={styles.iconBtn}
                      title="Open attendance"
                      onClick={() => navigate("/attendance-login")}
                    >
                      <FaExternalLinkAlt />
                    </button>
                    <button
                      className={styles.iconBtn}
                      title="Edit group"
                      onClick={() => handleEditGroup(group)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.iconBtn} ${styles.danger}`}
                      title="Delete group"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className={`${styles.iconBtn} ${isExpanded ? styles.active : ""}`}
                      title="Manage admin account"
                      onClick={() => handleExpandGroup(group.id)}
                    >
                      <FaKey />
                      {isExpanded ? (
                        <FaChevronUp style={{ fontSize: 10 }} />
                      ) : (
                        <FaChevronDown style={{ fontSize: 10 }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Admin account management panel */}
                {isExpanded && (
                  <div className={styles.adminPanel}>
                    <h4 className={styles.adminPanelTitle}>Admin Account</h4>
                    {admin ? (
                      <div className={styles.adminExisting}>
                        <div className={styles.adminInfo}>
                          <span className={styles.adminEmailLabel}>
                            Current email:
                          </span>
                          <span className={styles.adminEmailValue}>
                            {admin.email}
                          </span>
                        </div>
                        <div className={styles.adminFormRow}>
                          <input
                            className={styles.input}
                            type="password"
                            placeholder="New password"
                            value={adminForm.password}
                            onChange={(e) =>
                              handleAdminFormChange(
                                group.id,
                                "password",
                                e.target.value,
                              )
                            }
                          />
                          <button
                            className={styles.saveBtn}
                            onClick={() => handleUpdatePassword(group.id)}
                            disabled={!adminForm.password}
                          >
                            Update Password
                          </button>
                          <button
                            className={`${styles.cancelBtn} ${styles.danger}`}
                            onClick={() => handleDeleteAdmin(group.id)}
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.adminCreate}>
                        <p className={styles.noAdmin}>
                          No admin account yet. Create one:
                        </p>
                        <div className={styles.adminFormRow}>
                          <input
                            className={styles.input}
                            type="email"
                            placeholder="Admin email"
                            value={adminForm.email}
                            onChange={(e) =>
                              handleAdminFormChange(
                                group.id,
                                "email",
                                e.target.value,
                              )
                            }
                          />
                          <input
                            className={styles.input}
                            type="password"
                            placeholder="Password (min 6 chars)"
                            value={adminForm.password}
                            onChange={(e) =>
                              handleAdminFormChange(
                                group.id,
                                "password",
                                e.target.value,
                              )
                            }
                          />
                          <button
                            className={styles.saveBtn}
                            onClick={() => handleCreateAdmin(group.id)}
                            disabled={!adminForm.email || !adminForm.password}
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OtherTools;
