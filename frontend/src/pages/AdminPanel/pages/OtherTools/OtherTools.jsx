import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OtherTools.module.css";
import toast from "react-hot-toast";
import { FaPlus, FaSearch } from "react-icons/fa";
import { GroupForm, GroupCard } from "./widgets/index.js";
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

const emptyGroupForm = { name: "", type: "committee" };
const emptyAdminForm = { email: "", password: "" };

const FILTERS = [
  { key: "all", label: "All" },
  { key: "committee", label: "Committee" },
  { key: "scc", label: "SCC" },
  { key: "group", label: "Group" },
  { key: "other", label: "Other" },
];

const OtherTools = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingGroup, setSavingGroup] = useState(false);
  const [groupForm, setGroupForm] = useState(emptyGroupForm);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [adminForms, setAdminForms] = useState({});
  const [groupAdmins, setGroupAdmins] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadGroups();
  }, []);

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

  const loadGroupAdmin = async (group_id) => {
    try {
      const admin = await fetchGroupAdmin(group_id);
      setGroupAdmins((prev) => ({ ...prev, [group_id]: admin || null }));
    } catch {
      setGroupAdmins((prev) => ({ ...prev, [group_id]: null }));
    }
  };

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    setSavingGroup(true);
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
    } catch (err) {
      toast.error(err.message || "Failed to save group");
    } finally {
      setSavingGroup(false);
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
    } catch (err) {
      toast.error(err.message || "Failed to delete group");
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

  const handleAdminFormChange = (group_id, field, value) => {
    setAdminForms((prev) => ({
      ...prev,
      [group_id]: { ...(prev[group_id] || emptyAdminForm), [field]: value },
    }));
  };

  const handleTogglePassword = (key) => {
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCreateAdmin = async (group_id) => {
    const form = adminForms[group_id] || {};
    if (!form.email || !form.password)
      return toast.error("Email and password are required");
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    try {
      const admin = await createGroupAdmin(group_id, {
        email: form.email,
        password: form.password,
      });
      setGroupAdmins((prev) => ({ ...prev, [group_id]: admin }));
      setAdminForms((prev) => ({ ...prev, [group_id]: emptyAdminForm }));
      toast.success("Admin account created");
    } catch (err) {
      toast.error(err.message || "Failed to create admin account");
    }
  };

  const handleUpdatePassword = async (group_id) => {
    const form = adminForms[group_id] || {};
    if (!form.password || form.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    try {
      await updateGroupAdminPassword(group_id, form.password);
      setAdminForms((prev) => ({
        ...prev,
        [group_id]: { ...prev[group_id], password: "" },
      }));
      toast.success("Password updated");
    } catch (err) {
      toast.error(err.message || "Failed to update password");
    }
  };

  const handleDeleteAdmin = async (group_id) => {
    if (!window.confirm("Remove admin account for this group?")) return;
    try {
      await deleteGroupAdmin(group_id);
      setGroupAdmins((prev) => ({ ...prev, [group_id]: null }));
      toast.success("Admin account removed");
    } catch (err) {
      toast.error(err.message || "Failed to remove admin account");
    }
  };

  const filteredGroups = groups.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || g.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

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

      {showGroupForm && (
        <GroupForm
          groupForm={groupForm}
          setGroupForm={setGroupForm}
          editingGroup={editingGroup}
          onSubmit={handleGroupSubmit}
          onCancel={() => {
            setShowGroupForm(false);
            setEditingGroup(null);
          }}
          loading={savingGroup}
        />
      )}

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search groups…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch("")}>
              ×
            </button>
          )}
        </div>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {groups.length > 0 && (
        <p className={styles.resultCount}>
          {filteredGroups.length} of {groups.length} group
          {groups.length !== 1 ? "s" : ""}
        </p>
      )}

      {groups.length === 0 ? (
        <div className={styles.empty}>
          No groups yet. Create one above to get started.
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className={styles.empty}>
          No groups match your search or filter.
        </div>
      ) : (
        <div className={styles.groupListWrap}>
          <div className={styles.groupList}>
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                isExpanded={expandedGroup === group.id}
                admin={groupAdmins[group.id]}
                adminForm={adminForms[group.id] || emptyAdminForm}
                showPasswords={showPasswords}
                onExpand={handleExpandGroup}
                onEdit={handleEditGroup}
                onDelete={handleDeleteGroup}
                onNavigate={() => navigate("/attendance-login")}
                onFormChange={handleAdminFormChange}
                onTogglePassword={handleTogglePassword}
                onCreateAdmin={handleCreateAdmin}
                onUpdatePassword={handleUpdatePassword}
                onDeleteAdmin={handleDeleteAdmin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherTools;
