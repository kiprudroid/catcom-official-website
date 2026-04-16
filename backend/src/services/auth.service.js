import * as authModel from "../models/auth.model.js";
import db from "../config/db.config.js";

export const register = async (userData) => {
  const { full_name, email, password } = userData;

  // Check current admin count
  const result = await db.query(
    "SELECT COUNT(*) FROM users WHERE role = 'admin'",
  );
  const adminCount = parseInt(result.rows[0].count);

  if (adminCount >= 3) {
    throw new Error("Maximum number of admins reached");
  }

  // admins are only created via seed or admin route
  validateUserData({ full_name, email, password }, [
    "full_name",
    "email",
    "password",
  ]);

  return await authModel.register({
    full_name,
    email,
    password,
    role: "member",
  });
};

export const login = async (email, password) => {
  const credentials = { email, password };
  validateUserData(credentials, ["email", "password"]);
  return await authModel.login(credentials);
};

export const refreshTokens = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }
  return await authModel.refreshToken(refreshToken);
};

export const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }
  return await authModel.revokeToken(refreshToken);
};

export const getUserProfile = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return await authModel.getUserById(userId);
};

const validateUserData = (data, requiredFields) => {
  if (!data) {
    throw new Error("No data provided");
  }
  const missing = requiredFields.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
};
