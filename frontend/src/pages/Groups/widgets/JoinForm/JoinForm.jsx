import styles from "./JoinForm.module.css";
import React, { useState, useEffect } from "react";
import {
  SectionHeading,
  Paragraph,
} from "../../../../components/Typography/Typography";
import { createJoinGroup } from "@/api/joinGroup.api";

const initialForm = {
  fname: "",
  lname: "",
  phone: "",
  email: "",
  gender: "",
  college: "",
  groups: [],
};

function JoinForm() {
  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGroupChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      groups: checked
        ? [...prev.groups, value]
        : prev.groups.filter((g) => g !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fname ||
      !form.lname ||
      !form.phone ||
      !form.email ||
      !form.gender ||
      !form.college ||
      form.groups.length === 0
    ) {
      setModal({
        type: "validation",
        message:
          "Please fill all required fields and choose at least one group.",
      });
      return;
    }

    setLoading(true);

    try {
      await createJoinGroup(form);
      setModal({ type: "success" });
      setForm(initialForm);
    } catch (error) {
      setModal({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  function Modal({ type, message, onClose }) {
    const isSuccess = type === "success";
    const isError = type === "error";
    const isValidation = type === "validation";

    let title, msg, color;

    if (isSuccess) {
      title = "Request Submitted!";
      msg =
        "You have successfully submitted your request to join the selected group(s). We'll contact you soon.";
      color = "#22c55e";
    } else if (isError) {
      title = "Submission Failed";
      msg = message || "An error occurred. Please try again.";
      color = "#ef4444";
    } else if (isValidation) {
      title = "Incomplete Form";
      msg = message || "Please fill all required fields.";
      color = "#ef4444";
    }

    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalIcon} style={{ background: color }}>
            {isSuccess ? "✓" : "✕"}
          </div>
          <p className={styles.modalTitle}>{title}</p>
          <p className={styles.modalMessage}>{msg}</p>
          <button
            className={styles.modalBtn}
            style={{ background: color }}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formGrid}>
      {modal && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <SectionHeading as="h2">Joining a Group</SectionHeading>
        <Paragraph>
          To join a group, please fill out the form below and select the
          group(s) you wish to join.
        </Paragraph>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <div className={styles.fieldGroup}>
              <label htmlFor="fname">
                <Paragraph>First Name</Paragraph>
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={form.fname}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="lname">
                <Paragraph>Last Name</Paragraph>
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={form.lname}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone">
                <Paragraph>Phone Number</Paragraph>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">
                <Paragraph>Your E-mail</Paragraph>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="gender">
                <Paragraph>Gender</Paragraph>
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="college">
                <Paragraph>College</Paragraph>
              </label>
              <select
                id="college"
                name="college"
                value={form.college}
                onChange={handleChange}
              >
                <option value="">Select College</option>
                <option value="COHES">COHES</option>
                <option value="COPAS">COPAS</option>
                <option value="COANRE">COANRE</option>
                <option value="COETEC">COETEC</option>
                <option value="COHRED">COHRED</option>
              </select>
            </div>
          </div>

          <div className={styles.formCol}>
            <label className={styles.groupLabel}>
              <SectionHeading>Select Which Group(s) to Join</SectionHeading>
            </label>
            <div className={styles.checkboxGroup}>
              {[
                { id: "choir", value: "Choir", label: "Choir" },
                { id: "pastoral", value: "Pastoral", label: "Pastoral" },
                {
                  id: "BPS",
                  value: "Bible Prayer Service",
                  label: "Bible Prayer Service",
                },
                {
                  id: "technical",
                  value: "Technical Team",
                  label: "Technical Team",
                },
                {
                  id: "liturgical-dancers",
                  value: "Liturgical Dancers",
                  label: "Liturgical Dancers",
                },
                {
                  id: "communion-and-liberation",
                  value: "Communion and Liberation",
                  label: "Communion and Liberation",
                },
              ].map(({ id, value, label }) => (
                <div key={id}>
                  <input
                    type="checkbox"
                    id={id}
                    name="groups"
                    value={value}
                    checked={form.groups.includes(value)}
                    onChange={handleGroupChange}
                  />
                  <label htmlFor={id}>
                    <Paragraph>{label}</Paragraph>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className={styles.joinBtn} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Join Group(s)"}
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
