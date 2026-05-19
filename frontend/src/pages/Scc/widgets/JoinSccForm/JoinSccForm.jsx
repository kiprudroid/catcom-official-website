import React, { useState } from "react";
import {
  SectionHeading,
  Paragraph,
} from "./../../../../components/Typography/Typography";
import { createJoinScc } from "@/api/joinScc.api";
import styles from "./JoinSccForm.module.css";

const KENYAN_PHONE_REGEX = /^(?:0)(7[0-9]{8}|1[01][0-9]{7})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z\s'-]+$/;

const initialForm = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  year_study: "",
  gender: "",
};

function validate(form) {
  const errors = {};
  if (!form.first_name.trim()) errors.first_name = "First name is required";
  else if (!NAME_REGEX.test(form.first_name))
    errors.first_name = "Name must contain letters only";
  if (!form.last_name.trim()) errors.last_name = "Last name is required";
  else if (!NAME_REGEX.test(form.last_name))
    errors.last_name = "Name must contain letters only";
  if (!form.phone_number.trim())
    errors.phone_number = "Phone number is required";
  else if (!KENYAN_PHONE_REGEX.test(form.phone_number.replace(/\s/g, "")))
    errors.phone_number =
      "Enter a valid Kenyan number (07xxxxxxxx or 011xxxxxxxx)";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.year_study) errors.year_study = "Please select your year of study";
  if (!form.gender) errors.gender = "Please select your gender";
  return errors;
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <span className={styles.fieldError}>{msg}</span>;
}

// modal type: "success" | "duplicate_email" | "already_member" | "error"
function Modal({ type, onClose }) {
  const isSuccess = type === "success";
  const color = isSuccess ? "#22c55e" : "#ef4444";

  const title =
    {
      success: "Request Submitted!",
      duplicate_email: "Email Already Used",
      already_member: "Already a Member",
      error: "Submission Failed",
    }[type] ?? "Error";

  const message =
    {
      success:
        "You have successfully submitted your request to join an SCC. You will be contacted and assigned an SCC soon.",
      duplicate_email:
        "This email address has already been used to submit a join request. Please use a different email address.",
      already_member:
        "Our records show that you are already a member. If you think this is a mistake, please speak to your SCC leader directly.",
      error:
        "Something went wrong while submitting your request. Please try again.",
    }[type] ?? "An unexpected error occurred.";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIcon} style={{ background: color }}>
          {isSuccess ? "✓" : "✕"}
        </div>
        <p className={styles.modalTitle}>{title}</p>
        <p className={styles.modalMessage}>{message}</p>
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

function JoinSccForm({ className }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [modal, setModal] = useState(null); // null | "success" | "duplicate_email" | "already_member" | "error"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;
    if (name === "first_name" || name === "last_name") {
      sanitized = value.replace(/[^A-Za-z\s'-]/g, "");
    }
    if (name === "phone_number") {
      sanitized = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: sanitized });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      full_name:
        `${formData.first_name.trim()} ${formData.last_name.trim()}`.trim(),
      phone_number: formData.phone_number,
      email: formData.email,
      year_study: formData.year_study,
      gender: formData.gender,
      scc_name: "TBD",
    };

    setLoading(true);
    try {
      await createJoinScc(payload);
      setFormData(initialForm);
      setErrors({});
      setTouched({});
      setModal("success");
    } catch (err) {
      console.error(err);
      if (err.message === "ALREADY_MEMBER") {
        setModal("already_member");
      } else if (
        err.message?.toLowerCase().includes("email") ||
        err.message?.toLowerCase().includes("already")
      ) {
        setModal("duplicate_email");
      } else {
        setModal("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.formGrid} ${styles.joinForm} ${className ?? ""}`.trim()}
    >
      {modal && <Modal type={modal} onClose={() => setModal(null)} />}

      <SectionHeading as="h2">Joining an SCC</SectionHeading>
      <Paragraph className={styles.subtitle}>
        To join an SCC, please fill out the form below
      </Paragraph>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.inputRow}>
          <div className={styles.inputCol}>
            <label>
              <Paragraph>First Name</Paragraph>
            </label>
            <input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.first_name && touched.first_name ? styles.inputError : ""
              }
            />
            <FieldError msg={touched.first_name ? errors.first_name : ""} />
          </div>
          <div className={styles.inputCol}>
            <label>
              <Paragraph>Last Name</Paragraph>
            </label>
            <input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.last_name && touched.last_name ? styles.inputError : ""
              }
            />
            <FieldError msg={touched.last_name ? errors.last_name : ""} />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputCol}>
            <label>
              <Paragraph>Phone Number</Paragraph>
            </label>
            <input
              name="phone_number"
              placeholder="07xxxxxxxx or 011xxxxxxxx"
              value={formData.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
              inputMode="numeric"
              className={
                errors.phone_number && touched.phone_number
                  ? styles.inputError
                  : ""
              }
            />
            <FieldError msg={touched.phone_number ? errors.phone_number : ""} />
          </div>
          <div className={styles.inputCol}>
            <label>
              <Paragraph>Your E-mail</Paragraph>
            </label>
            <input
              name="email"
              type="email"
              placeholder="jane@gmail.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? styles.inputError : ""}
            />
            <FieldError msg={touched.email ? errors.email : ""} />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputCol}>
            <label>
              <Paragraph>Year of Study</Paragraph>
            </label>
            <select
              name="year_study"
              value={formData.year_study}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.year_study && touched.year_study ? styles.inputError : ""
              }
            >
              <option value="">Select Year</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
              <option value="6">6th</option>
            </select>
            <FieldError msg={touched.year_study ? errors.year_study : ""} />
          </div>
          <div className={styles.inputCol}>
            <label>
              <Paragraph>Gender</Paragraph>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.gender && touched.gender ? styles.inputError : ""
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <FieldError msg={touched.gender ? errors.gender : ""} />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.joinBtn} type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Join SCC"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinSccForm;
