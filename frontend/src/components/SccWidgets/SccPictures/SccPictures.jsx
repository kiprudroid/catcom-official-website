// import React from "react";
// import styles from "./SccPictures.module.css";
// import { SectionHeading } from "../../Typography/Typography";
// import SccCard from "../../SccWidgets/SccCard/SccCard.jsx";
// import { SCCs } from "../../../DataFiles/scc.js";

// const SccPictures = ({ className }) => {
//   return (
//     <div className={`${styles.sccPictures} ${className}`}>
//       <SectionHeading className={styles.centeredText}>Our SCCs</SectionHeading>
//       <div className={styles.sccCardsWrapper}>
//         {SCCs.map((_, index) => (
//           <SccCard
//             key={index}
//             SccName={SCCs[index].name}
//             path={SCCs[index].path}
//             image={SCCs[index].image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SccPictures;
import React from "react";
import styles from "./SccPictures.module.css";
import { SectionHeading } from "../../Typography/Typography";
import Card from "../Card/Card.jsx";
import { sccCards } from "../../../DataFiles/scc.js";

const SccPictures = ({ className }) => {
  return (
    <div className={`${styles.sccPictures} ${className}`}>
      <SectionHeading fontSize="1.8rem" className={styles.centeredText}>
        Our SCCs
      </SectionHeading>

      <div className={styles.sccCardsWrapper}>
        {sccCards.map((card, index) => (
          <Card
            key={index}
            SccName={card.name}
            path={card.path}
            images={card.images}
          />
        ))}
      </div>
    </div>
  );
};

export default SccPictures;
