import React from "react";
import styles from "./ContactsBar.module.css";

const CONTACTS = [
  {
    name: "Sean Nayere",
    role: "Organising Secretary",
    phone: "0791 522 574",
  },
  {
    name: "Ruth Wanjiku",
    role: "Publicity Secretary",
    phone: "0793 762 449",
  },
];

const ContactsBar = () => (
  <div className={styles.bar}>
    {CONTACTS.map((c) => (
      <p key={c.name} className={styles.item}>
        <strong>{c.name}</strong> ({c.role}) — {c.phone}
      </p>
    ))}
  </div>
);

export default ContactsBar;
