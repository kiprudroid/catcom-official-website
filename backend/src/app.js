import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import eventsRouter from "./routes/event.routes.js";
import leadersRouter from "./routes/leaders.routes.js";
import authRouter from "./routes/auth.routes.js";
import joinSccRouter from "./routes/join-scc.routes.js";
import sccLeadersRouter from "./routes/scc-leaders.routes.js";
import groupsRouter from "./routes/join-group.routes.js";
import readingsRouter from "./routes/readings.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";
import mediaRouter from "./routes/media.routes.js"; // ← new
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const uploadsDir = path.join(__dirname, "../uploads");
const uploadsDir = path.join(process.cwd(), "public/uploads");

app.use("/uploads", express.static(uploadsDir));

if (process.env.NODE_ENV !== "development") {
  app.use(cors({ origin: "https://jkuatcatcom.com" }));
}

app.use(express.json());

app.use("/api", eventsRouter);
app.use("/api", leadersRouter);
app.use("/api", sccLeadersRouter);
app.use("/api", groupsRouter);
app.use("/api", authRouter);
app.use("/api", joinSccRouter);
app.use("/api", readingsRouter);
app.use("/api", attendanceRouter);
app.use("/api", mediaRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;