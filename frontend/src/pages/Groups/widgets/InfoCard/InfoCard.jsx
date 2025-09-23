import styles from "./InfoCard.module.css";
import React, { useState, useEffect } from "react";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

function InfoCard() {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoRow}>
        <div>
          <SectionHeading as="h1" className={styles.infoHeader}>
            Groups in Jkuat Catcom
          </SectionHeading>
        </div>

        <div>
          <img
            src="/others/Group.jpg"
            alt="Church Group Icon"
            className={styles.infoIcon}
            style={{
              width: "100px",
              height: "100px",
              float: "left",
              marginRight: "1rem",
            }}
          />
          <Paragraph className={styles.textContent}>
            The CATCOM community is built on unity, service, and shared faith.
            Our various groups bring together students with different gifts,
            passions, and callings all working together to strengthen our
            mission and deepen our fellowship. These groups are the lifeblood of
            our ministry, creating opportunities for active participation,
            leadership, and growth within the Catholic faith. By joining a
            group, members find belonging, purpose, and a meaningful way to live
            out their discipleship at JKUAT.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
