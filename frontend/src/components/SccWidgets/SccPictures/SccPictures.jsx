import React from 'react';
import styles from './SccPictures.module.css';
import { SectionHeading } from '../../Typography/Typography';
import SccCard from '../../SccWidgets/SccCard/SccCard.jsx';
import { SCCs } from '../../../DataFiles/scc.js';

const SccPictures = () => {
    return (
         <div className={`${styles.item} ${styles.sccPictures}`}>
                  <SectionHeading className={styles.centeredText}>Our SCCs</SectionHeading>
                  <div className={`contentWrapper ${styles.sccCardsWrapper}`}>
                    {SCCs.map((_, index) => (
                      <SccCard
                        key={index}
                        SccName={SCCs[index].name}
                        path={SCCs[index].path}
                        image={SCCs[index].image}
                      />
                    ))}
                  </div>
                </div>
    );
};

export default SccPictures;