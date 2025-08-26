import React from "react";
import "@fontsource/inter";
import "@fontsource/nunito-sans";
import styles from "./Typography.module.css";

export const Text = ({ children, className }) => {
  return (
    <div>
      <h1 style={{ fontFamily: "Inter, sans-serif" }}>{children}</h1>
    </div>
  );
};

export const SmallText = ({ children, className }) => {
  return (
    <div>
      <h1
        className={className}
        style={{
          fontFamily: "Nunito Sans",
          fontSize: "0.95rem",
          fontWeight: "unset",
          margin: 0,
        }}
      >
        {children}
      </h1>
    </div>
  );
};

// export const SmallText = ({ children, className, as: Component = "p" }) => {
//   return (
//     <Component
//       className={className}
//       style={{
//         fontFamily: "Nunito Sans",
//         fontSize: "0.95rem",
//         fontWeight: "unset",
//         margin: 0, // prevent unwanted spacing
//       }}
//     >
//       {children}
//     </Component>
//   );
// };

export const Paragraph = ({ children }) => {
  return (
    <p
      className={styles.textContent}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </p>
  );
};

export const Heading = ({ children, as = "h2", className }) => {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "Inter, sans-serif",
        color: "#2dabb1",
        textAlign: "center",
      }}
    >
      {children}
    </Tag>
  );
};

export const FooterHeading = ({ children, className }) => {
  return (
    <h3
      className={`${styles.footerTitle} ${className || ""}`}
      style={{ fontFamily: "Inter, sans-serif", color: "#FE8900" }}
    >
      {children}
    </h3>
  );
};

export const SectionHeading = ({ children, as = "h3", className }) => {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "Inter, sans-serif",
        color: "#2dabb1ff",
      }}
    >
      {children}
    </Tag>
  );
};
