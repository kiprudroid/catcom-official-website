import styles from "./JoinSccForm.module.css";
import React, { useState, useEffect } from "react";
import { SectionHeading, Paragraph } from "../../Typography/Typography";


 function JoinSccForm({className}) {

    return (
      <div className={`${styles.joinForm} ${className}`}>
      <form className={styles.formGrid}>
        <SectionHeading as="h2">Joining an SCC</SectionHeading>
        <Paragraph>To join an SCC, please fill out the form below</Paragraph>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <div className={styles.inputRow}>
              <div className={styles.inputCol}>
                <label htmlFor="firstName">
                  <Paragraph>First Name</Paragraph>
                </label>
                <input type="text" id="firstName" name="firstName" />
              </div>
              <div className={styles.inputCol}>
                <label htmlFor="lastName">
                  <Paragraph>Last Name</Paragraph>
                </label>
                <input type="text" id="lastName" name="lastName" />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputCol}>
                <label htmlFor="phone">
                  <Paragraph>Phone Number</Paragraph>
                </label>
                <input type="text" id="phone" name="phone" />
              </div>
              <div className={styles.inputCol}>
                <label htmlFor="email">
                  <Paragraph>Your E-mail</Paragraph>
                </label>
                <input type="email" id="email" name="email" />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputCol}>
                <label htmlFor="yearOfStudy">
                  <Paragraph>Year of Study</Paragraph>
                </label>
                <select id="yearOfStudy" name="yearOfStudy">
                  <option value="">Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                </select>
              </div>
              <div className={styles.inputCol}>
                <label htmlFor="gender">
                  <Paragraph>Gender</Paragraph>
                </label>
                <select id="gender" name="gender">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <Paragraph
          style={{ marginTop: "1rem", fontSize: "1rem", color: "#124346" }}
        >
          After submitting, you will be contacted and informed of the SCC to
          join.
        </Paragraph>
        <div className={styles.buttonRow}>
          <button className={styles.joinBtn}>Join SCC</button>
        </div>
      </form>
      </div>
    );
 }
    export default JoinSccForm;