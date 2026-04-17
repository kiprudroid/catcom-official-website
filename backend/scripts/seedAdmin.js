import db from "../src/config/db.config.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_DEFAULT_PASSWORD,
      10,
    );

    await db.query(
      `
      INSERT INTO users (full_name, email, password, role)
      VALUES ($1, $2, $3, 'admin')
      ON CONFLICT (email) DO NOTHING
    `,
      [process.env.ADMIN_NAME, process.env.ADMIN_EMAIL, hashedPassword],
    );

    console.log("✅ Admin seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedAdmin();
