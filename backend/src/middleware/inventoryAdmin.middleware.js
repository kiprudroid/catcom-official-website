import { verifyAccessToken } from "../models/auth.model.js";

export const verifyInventoryAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorised: no token provided" });
    }

    const decoded = verifyAccessToken(token);

    if (decoded.role !== "inventory-admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: inventory admin access required" });
    }

    req.user = decoded; // contains admin_id, email, group_ids[], groups[]
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorised: invalid or expired token" });
  }
};
