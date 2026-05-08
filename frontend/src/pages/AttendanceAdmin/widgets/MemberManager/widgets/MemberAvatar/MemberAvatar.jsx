import React from "react";

const AVATAR_COLORS = [
  "#2dabb1",
  "#e67e22",
  "#8e44ad",
  "#27ae60",
  "#e74c3c",
  "#2980b9",
  "#f39c12",
  "#16a085",
];

export const avatarColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const MemberAvatar = ({ name, size = 34, fontSize = 12, style = {} }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: avatarColor(name),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize,
      fontWeight: 700,
      color: "white",
      flexShrink: 0,
      letterSpacing: "0.02em",
      ...style,
    }}
  >
    {getInitials(name)}
  </div>
);

export default MemberAvatar;
