import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/pastoral/auth/login", async (req, res) => {
  console.log("ENV EMAIL:", process.env.PASTORAL_EMAIL);
  console.log("ENV PASSWORD:", process.env.PASTORAL_PASSWORD);
  console.log("BODY:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const envEmail = process.env.PASTORAL_EMAIL;
  const envPassword = process.env.PASTORAL_PASSWORD;

  if (!envEmail || !envPassword) {
    return res
      .status(500)
      .json({ message: "Pastoral credentials not configured" });
  }

  const emailMatch =
    email.trim().toLowerCase() === envEmail.trim().toLowerCase();
  const passwordMatch = password === envPassword;

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: envEmail, role: "pastoral-admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  res.status(200).json({ token, role: "pastoral-admin" });
});

export default router;
