import React from "react";
import "@fontsource/inter";
import "@fontsource/nunito-sans";
import styles from "./Typography.module.css";

const Text = ({ children, className }) => {
  return (
    <div>
      <h1 style={{ fontFamily: "Inter, sans-serif" }}>{children}</h1>
    </div>
  );
};
const SmallText = ({ children, className }) => {
  return (
    <div>
      <h1
        className={className}
        style={{
          fontFamily: "Nunito Sans",
          fontSize: "1.5rem",
          fontWeight: "unset",
        }}
      >
        {children}
      </h1>
    </div>
  );
};
const Paragraph = ({ children }) => {
  return (
    <p
      className={styles.textContent}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </p>
  );
};

const Heading = ({ children, as = "h2", className }) => {
  const Tag = as; // Dynamically use the passed tag, default to h2
  return (
    <Tag className={className} style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </Tag>
  );
};

const FooterHeading = ({ children, className }) => {
  return (
    <h3
      className={`${styles.footerTitle} ${className || ""}`}
      style={{ fontFamily: "Inter, sans-serif", color: "#FE8900" }}
    >
      {children}
    </h3>
  );
};

export { Text, Paragraph, Heading, FooterHeading, SmallText };
