import React from "react";
import "@fontsource/nunito-sans";
import styles from "./Typography.module.css";

export const SmallText = ({ children, className, as: Component = "p" }) => {
  return (
    <Component
      className={className}
      style={{
        fontFamily: "Nunito Sans",
        fontSize: "0.95rem",
        fontWeight: "unset",
        margin: 0,
      }}
    >
      {children}
    </Component>
  );
};

export const SectionHeading = ({ children, as = "h3", className }) => {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "Nunito Sans",
        color: "#2dabb1ff",
      }}
    >
      {children}
    </Tag>
  );
};
