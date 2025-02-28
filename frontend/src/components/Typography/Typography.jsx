import React from 'react';
import '@fontsource/inter';
import '@fontsource/nunito-sans';
import styles from './Typography.module.css';

const Text = ({ children }) => {
    return (
        <div>
            <h1 style={{ fontFamily: 'Inter, sans-serif' }}>{children}</h1>
        </div>
    );
}
const SmallText = ({ children }) => {
  return (
    <div>
      <h1 style={{ fontFamily: "Nunito Sans" , fontSize : "1.5rem" ,fontWeight:"unset" }}>{children}</h1>
    </div>
  );
};
const Paragraph = ({ children }) => {
    return (
        <p className={styles.textContent} style={{ fontFamily: 'Inter, sans-serif' }}>
            {children}
        </p>
    );
}

const Heading = ({ children }) => {
    return (
        <h3 className={styles.contentTitle} style={{ fontFamily: 'Inter, sans-serif' }}>
            {children}
        </h3>
    );
}


const FooterHeading = ({ children }) => {
return (
  <h3
    className={styles.footerTitle}
    style={{ fontFamily: "Inter, sans-serif", color: "#FE8900" }}
  >
{children}
  </h3>
);
};

export { Text, Paragraph, Heading , FooterHeading , SmallText};


