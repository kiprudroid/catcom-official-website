import React from "react";
import { Link } from "react-router-dom";
import styles from "./Reports.module.css";
import { Paragraph, SectionHeading } from "@/components/Typography/Typography";

export default function Reports() {
  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.logoGroup}>
          <Link to="/admin" className={styles.backLink}>
            ← Back to Admin
          </Link>
          <SectionHeading>Reports</SectionHeading>
        </div>
      </div>

      <section className={styles.section}>
        <Paragraph>Reports / exports coming soon. Example ideas:</Paragraph>
        <ul>
          <li>Download CSV of members joined in the last 7 days.</li>
          <li>Counts of paid/unpaid/overdue this month.</li>
          <li>Events attendance export.</li>
        </ul>
        <div style={{ marginTop: 12 }}>
          <button disabled>Export CSV (placeholder)</button>
        </div>
      </section>
    </div>
  );
}
