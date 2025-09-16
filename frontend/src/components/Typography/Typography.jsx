import React from "react";
import "@fontsource/nunito-sans";
import styles from "./Typography.module.css";

export const Paragraph = ({
  children,
  fontSize = "0.95rem",
  className,
  as: Component = "p",
}) => {
  return (
    <Component
      className={className}
      style={{
        fontFamily: "Nunito Sans",
        fontSize,
        fontWeight: "unset",
      }}
    >
      {children}
    </Component>
  );
};

export const SectionHeading = ({
  children,
  fontSize = "",
  as = "h3",
  className,
}) => {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "Nunito Sans",
        color: "#2dabb1ff",
        fontSize,
      }}
    >
      {children}
    </Tag>
  );
};
