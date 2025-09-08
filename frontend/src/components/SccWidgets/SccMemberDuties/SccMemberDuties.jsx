import React from 'react';
import styles from './SccMemberDuties.module.css';
import {Paragraph,SectionHeading} from '../../Typography/Typography';

const SccMemberDuties = () => {
    return (
         <div className={`${styles.item} ${styles.sccMembersDuties}`}>
          <SectionHeading className={styles.centeredText}>What SCC Members Should Do</SectionHeading>
          <Paragraph >
          <ul className={styles.membersDutiesList}>
            <li>Attend Rosary prayers at the SCC meetings every Sunday</li>
            <li>Participate actively in SCC meetings and activities</li>
            <li>Support and encourage fellow members</li>
            <li>Engage in community outreach and service</li>
            <li>Promote unity and cooperation within the SCC</li>
            <li>Take responsibility for assigned roles and tasks</li>
            <li>Pray together and for one another</li>
            <li>Contribute ideas for SCC growth and improvement</li>
          </ul>
          </Paragraph>
        </div>
    );
};

export default SccMemberDuties;