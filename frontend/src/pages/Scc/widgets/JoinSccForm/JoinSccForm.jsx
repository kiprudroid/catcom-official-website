import React, { useState } from "react";
import {
  SectionHeading,
  Paragraph,
} from "./../../../../components/Typography/Typography";
import { createJoinScc } from "@/api/joinScc.api";
import styles from "./JoinSccForm.module.css";

function Modal({ type, onClose }) {
  const isSuccess = type === "success";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.modalIcon}
          style={{ background: isSuccess ? "#22c55e" : "#ef4444" }}
        >
          {isSuccess ? "✓" : "✕"}
        </div>

        <p className={styles.modalTitle}>
          {isSuccess ? "Request Submitted!" : "Email Already Used"}
        </p>

        <p className={styles.modalMessage}>
          {isSuccess
            ? "You have successfully submitted your request to join an SCC. You will be contacted and assigned an SCC soon."
            : "This email address has already been used to submit a join request. Please use a different email address."}
        </p>

        <button
          className={styles.modalBtn}
          style={{ background: isSuccess ? "#22c55e" : "#ef4444" }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function JoinSccForm({ className }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    year_study: "",
    gender: "",
  });

  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: `${formData.first_name.trim()} ${formData.last_name.trim()}`.trim(),
      phone_number: formData.phone_number,
      email: formData.email,
      year_study: formData.year_study,
      gender: formData.gender,
      scc_name: "TBD",
    };

    try {
      await createJoinScc(payload);

      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        year_study: "",
        gender: "",
      });

      setModal("success");
    } catch (err) {
      console.error(err);
      setModal("error");
    }
  };

  return (
    <div className={`${styles.formGrid} ${styles.joinForm} ${className ?? ""}`.trim()}>

      {modal && <Modal type={modal} onClose={() => setModal(null)} />}

      <SectionHeading as="h2">Joining an SCC</SectionHeading>
      <Paragraph className={styles.subtitle}>
        To join an SCC, please fill out the form below
      </Paragraph>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <div className={styles.inputCol}>
            <label><Paragraph>First Name</Paragraph></label>
            <input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputCol}>
            <label><Paragraph>Last Name</Paragraph></label>
            <input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputCol}>
            <label><Paragraph>Phone Number</Paragraph></label>
            <input
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputCol}>
            <label><Paragraph>Your E-mail</Paragraph></label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputCol}>
            <label><Paragraph>Year of Study</Paragraph></label>
            <select
              name="year_study"
              value={formData.year_study}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
              <option value="6">6th</option>
            </select>
          </div>
          <div className={styles.inputCol}>
            <label><Paragraph>Gender</Paragraph></label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        
        <div className={styles.buttonRow}>
          <button className={styles.joinBtn} type="submit">
            Join SCC
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinSccForm;
