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
  groups: "",
};

const KENYAN_PHONE_REGEX = /^(?:0)(7[0-9]{8}|1[01][0-9]{7})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z\s'-]+$/;

function validate(form) {
  const errors = {};
  if (!form.fname.trim()) errors.fname = "First name is required";
  else if (!NAME_REGEX.test(form.fname))
    errors.fname = "Name must contain letters only";
  if (!form.lname.trim()) errors.lname = "Last name is required";
  else if (!NAME_REGEX.test(form.lname))
    errors.lname = "Name must contain letters only";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!KENYAN_PHONE_REGEX.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid Kenyan number (07xxxxxxxx or 011xxxxxxxx)";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.gender) errors.gender = "Please select your gender";
  if (!form.college) errors.college = "Please select your college";
  if (!form.groups) errors.groups = "Please select a group";
  return errors;
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <span className={styles.fieldError}>{msg}</span>;
}

function Modal({ type, message, onClose }) {
  const isSuccess = type === "success";
  const color = isSuccess ? "#22c55e" : "#ef4444";
  const title = isSuccess
    ? "Request Submitted!"
    : type === "validation"
      ? "Incomplete Form"
      : "Submission Failed";
  const msg = isSuccess
    ? "You have successfully submitted your request to join the selected group. We'll contact you soon."
    : message || "Please check your details and try again.";

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

function JoinForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;
    if (name === "fname" || name === "lname") {
      sanitized = value.replace(/[^A-Za-z\s'-]/g, "");
    }
    if (name === "phone") {
      sanitized = value.replace(/\D/g, "").slice(0, 10);
    }
    setForm((prev) => ({ ...prev, [name]: sanitized }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: sanitized });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleGroupChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, groups: value }));
    setTouched((prev) => ({ ...prev, groups: true }));
    setErrors((prev) => ({ ...prev, groups: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      { groups: true },
    );
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await createJoinGroup(form);
      setModal({ type: "success" });
      setForm(initialForm);
      setErrors({});
      setTouched({});
    } catch (error) {
      setModal({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      id: "fname",
      label: "First Name",
      type: "text",
      placeholder: "e.g. Jane",
    },
    {
      id: "lname",
      label: "Last Name",
      type: "text",
      placeholder: "e.g. Wanjiru",
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "07xxxxxxxx or 011xxxxxxxx",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "jane@gmail.com",
    },
  ];

  const groups = [
    { id: "choir", value: "Choir", label: "Choir" },
    { id: "pastoral", value: "Pastoral", label: "Pastoral" },
    { id: "BPS", value: "Bible Prayer Service", label: "Bible Prayer Service" },
    { id: "technical", value: "Technical Team", label: "Technical Team" },
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
  ];

  return (
    <div className={styles.formGrid}>
      {modal && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
        <SectionHeading as="h2">Join a Group</SectionHeading>
        <Paragraph>
          Fill out the form below to request to join a CATCOM group.
        </Paragraph>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            {fields.map(({ id, label, type, placeholder }) => (
              <div
                key={id}
                className={`${styles.fieldGroup} ${errors[id] && touched[id] ? styles.fieldError_wrap : ""}`}
              >
                <label htmlFor={id}>
                  <Paragraph>{label}</Paragraph>
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={form[id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  maxLength={id === "phone" ? 10 : undefined}
                  inputMode={id === "phone" ? "numeric" : undefined}
                  className={errors[id] && touched[id] ? styles.inputError : ""}
                />
                <FieldError msg={touched[id] ? errors[id] : ""} />
              </div>
            ))}

            <div
              className={`${styles.fieldGroup} ${errors.gender && touched.gender ? styles.fieldError_wrap : ""}`}
            >
              <label htmlFor="gender">
                <Paragraph>Gender</Paragraph>
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.gender && touched.gender ? styles.inputError : ""
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <FieldError msg={touched.gender ? errors.gender : ""} />
            </div>

            <div
              className={`${styles.fieldGroup} ${errors.college && touched.college ? styles.fieldError_wrap : ""}`}
            >
              <label htmlFor="college">
                <Paragraph>College</Paragraph>
              </label>
              <select
                id="college"
                name="college"
                value={form.college}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.college && touched.college ? styles.inputError : ""
                }
              >
                <option value="">Select College</option>
                <option value="COHES">COHES</option>
                <option value="COPAS">COPAS</option>
                <option value="COANRE">COANRE</option>
                <option value="COETEC">COETEC</option>
                <option value="COHRED">COHRED</option>
              </select>
              <FieldError msg={touched.college ? errors.college : ""} />
            </div>
          </div>

          <div className={styles.formCol}>
            <label className={styles.groupLabel}>
              <SectionHeading>Select a Group to Join</SectionHeading>
            </label>
            <div
              className={`${styles.checkboxGroup} ${errors.groups && touched.groups ? styles.checkboxError : ""}`}
            >
              {groups.map(({ id, value, label }) => (
                <div key={id} className={styles.checkboxItem}>
                  <input
                    type="radio"
                    id={id}
                    name="groups"
                    value={value}
                    checked={form.groups === value}
                    onChange={handleGroupChange}
                    onBlur={() => setTouched((p) => ({ ...p, groups: true }))}
                  />
                  <label htmlFor={id}>
                    <Paragraph>{label}</Paragraph>
                  </label>
                </div>
              ))}
            </div>
            <FieldError msg={touched.groups ? errors.groups : ""} />
          </div>
        </div>

        <button className={styles.joinBtn} type="submit" disabled={loading}>
          {loading ? "Submitting…" : "Join Group"}
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
