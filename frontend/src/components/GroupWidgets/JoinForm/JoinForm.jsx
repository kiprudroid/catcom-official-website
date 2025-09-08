import styles from "./JoinForm.module.css";
import React, { useState, useEffect } from "react";
import { SectionHeading, Paragraph } from "../../Typography/Typography";


 function JoinForm() {

    return (
       <form className={styles.formGrid}>
              <SectionHeading as="h2">Joining a Group</SectionHeading>
              <Paragraph>
                To join a group, please fill out the form below and select the group(s) you wish to join.
                  </Paragraph>
              <div className={styles.formRow}>
                <div className={styles.formCol}>
                  <label htmlFor="name"><Paragraph>First Name</Paragraph></label>
                  <input type="text" id="name" name="name" />
                  <label htmlFor="name"><Paragraph>Last Name</Paragraph></label>
                  <input type="text" id="name" name="name" />
                  <label htmlFor="phone"><Paragraph>Phone Number</Paragraph></  label>
                  <input type="text" id="phone" name="phone" />
                  <label htmlFor="email"><Paragraph>Your E-mail</Paragraph></label>
                  <input type="email" id="email" name="email" />
                  <label htmlFor="gender"><Paragraph>Gender</Paragraph></label>
                  <select id="gender" name="gender">
                    <option value="Male"><Paragraph>Select Gender</Paragraph></option>
                    <option value="Male"><Paragraph>Male</Paragraph></option>
                    <option value="Female"><Paragraph>Female</Paragraph></option>
                    <option value="Other"><Paragraph>Other</Paragraph></option>
                  </select>
                </div>
                <div className={styles.formCol}>
                  <label htmlFor="year"><Paragraph>Year of Study</Paragraph></label>
                  <select id="year" name="year">
                       <option value=""><Paragraph>Select Year</Paragraph></option>
                       <option value="1"><Paragraph>1st Year</Paragraph></option>
                       <option value="2"><Paragraph>2nd Year</Paragraph></option>
                       <option value="3"><Paragraph>3rd Year</Paragraph></option>
                       <option value="4"><Paragraph>4th Year</Paragraph></option>
                       <option value="5"><Paragraph>5th Year</Paragraph></option>
                      <option value="6"><Paragraph>6th Year</Paragraph></option>      
                   </select>
                  <label htmlFor="college"><Paragraph>College</Paragraph></label>
                  <select id="college" name="college">
                       <option value="text"><Paragraph>Select College</Paragraph></option>
                       <option value="text"><Paragraph>COHES</Paragraph></option>
                       <option value="text"><Paragraph>COPAS</Paragraph></option>
                       <option value="text"><Paragraph>COANRE</Paragraph></option>
                       <option value="text"><Paragraph>COETEC</Paragraph></option>
                       <option value="text"><Paragraph>COHRED</Paragraph></option>
                   </select>
                  <label className={styles.groupLabel}>
                    <SectionHeading>Select Which Group(s) to Join</SectionHeading>
                  </label>
                  <div className={styles.checkboxGroup}>
                    <div>
                      <input
                        type="checkbox"
                        id="choir"
                        name="groups"
                        value="Choir"
                      />
                      <label htmlFor="choir"><Paragraph>Choir</Paragraph></label>
                    </div>
                    
                    <div>
                      <input
                        type="checkbox"
                        id="pastoral"
                        name="groups"
                        value="Pastoral"
                      />
                      <label htmlFor="pastoral"><Paragraph>Pastoral</Paragraph></label>
                    </div>
                    
                    <div>
                      <input
                        type="checkbox"
                        id="BPS"
                        name="groups"
                        value="Bible Prayer Service"
                      />
                      <label htmlFor="BPS"><Paragraph>Bible Prayer Service</Paragraph></label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="technical"
                        name="groups"
                        value="technical"
                      />
                      <label htmlFor="technical"><Paragraph>Technical Team</Paragraph></label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="liturgical dancers"
                        name="groups"
                        value="liturgical dancers"
                      />
                      <label htmlFor="liturgical dancers"><Paragraph>Liturgical Dancers</Paragraph></label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="communion and liberation"
                        name="groups"
                        value="communion and liberation"
                      />
                      <label htmlFor="communion and liberation">
                       <Paragraph>Communion and Liberation</Paragraph>
                      </label>
                    </div>
                    <Paragraph>
                   After filling this form you will be added to the group within 24 hours.
                    </Paragraph>
                  </div>
                </div>
              </div>
              <button className={styles.joinBtn}>Join Group</button>
            </form>
    );
 }
    export default JoinForm;