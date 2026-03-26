import dotenv from "dotenv";
dotenv.config(); // ← must be first
console.log("JWT_SECRET:", process.env.JWT_SECRET); // ← add this

import app from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port http://localhost:${PORT}`),
);
