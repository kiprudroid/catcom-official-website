import React from 'react';
import styles from './WhatIsScc.module.css';
import { SectionHeading, Paragraph } from '../../Typography/Typography';

const WhatIsScc = () => {
    return (
        <div className={`${styles.item} ${styles.whatIsScc}`}>
          <SectionHeading className={styles.centeredText}>What is an SCC?:</SectionHeading>
          <p
            className={styles.textContent}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A Small Christian Community (SCC) is the Church within the
            community, comprising of a manageable group of students, which help
            to promote communion, co-responsibility, and gives every member a
            sense of belonging to the community at large.
          </p>
        </div>
    );
};

export default WhatIsScc;