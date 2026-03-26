import db from "../config/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (data) => {
  const { full_name, email, password, role } = data;

  const checkQuery = "SELECT * FROM users WHERE email = $1";
  const existingUser = await db.query(checkQuery, [email]);

  if (existingUser.rows.length > 0) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (full_name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role, created_at
  `;

  const result = await db.query(query, [
    full_name,
    email,
    hashedPassword,
    role,
  ]);
  const user = result.rows[0];

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await storeRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const login = async (credentials) => {
  const { email, password } = credentials;

  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) throw new Error("Invalid email or password");

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await storeRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const result = await db.query(
      "SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2 AND revoked = false",
      [decoded.userId, token],
    );

    if (result.rows.length === 0) throw new Error("Invalid refresh token");

    const userResult = await db.query("SELECT * FROM users WHERE id = $1", [
      decoded.userId,
    ]);
    if (userResult.rows.length === 0) throw new Error("User not found");

    const user = userResult.rows[0];
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await revokeRefreshToken(token);
    await storeRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

// ── Helper functions — read process.env INSIDE function calls ─────

const generateAccessToken = (user) =>
  jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET, // ← read here, not at module top
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET, // ← read here, not at module top
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
  );

const storeRefreshToken = async (userId, token) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await db.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)`,
    [userId, token, expiresAt],
  );
};

const revokeRefreshToken = async (token) => {
  await db.query("UPDATE refresh_tokens SET revoked = true WHERE token = $1", [
    token,
  ]);
};

export const revokeToken = async (token) => {
  await revokeRefreshToken(token);
  return { message: "Token revoked successfully" };
};

export const getUserById = async (userId) => {
  const result = await db.query(
    "SELECT id, full_name, email, role, created_at FROM users WHERE id = $1",
    [userId],
  );
  if (result.rows.length === 0) throw new Error("User not found");
  return result.rows[0];
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // ← read here, not at module top
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};
