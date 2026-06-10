import React from "react";
import styles from "./ContactsBar.module.css";

const CONTACTS = [
  {
    name: "Wilfred Wandera",
    role: "Organising Secretary",
    phone: "0715 115 907",
  },
  {
    name: "Hillary Kasaine",
    role: "Publicity Secretary",
    phone: "0743 382 152",
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
