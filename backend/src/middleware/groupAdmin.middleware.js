import { verifyAccessToken } from "../models/auth.model.js";

export const verifyGroupAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorised: no token provided" });
    }

    const decoded = verifyAccessToken(token);

    if (decoded.role !== "group-admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: group admin access required" });
    }

    req.user = decoded; // contains group_id, group_name, group_type, email
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorised: invalid or expired token" });
  }
};
