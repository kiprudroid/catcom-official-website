import express, { Router } from "express";
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
import mediaRouter from "./routes/media.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(process.cwd(), "public/uploads");

app.use("/uploads", express.static(uploadsDir));
app.use(cors());
app.use(express.json());

// Build one API router
const apiRouter = Router();
apiRouter.use(eventsRouter);
apiRouter.use(leadersRouter);
apiRouter.use(sccLeadersRouter);
apiRouter.use(groupsRouter);
apiRouter.use(authRouter);
apiRouter.use(joinSccRouter);
apiRouter.use(readingsRouter);
apiRouter.use(attendanceRouter);
apiRouter.use(mediaRouter);

// Mount for both cases (Passenger strips /backend OR not)
app.use("/api", apiRouter);
app.use("/backend/api", apiRouter);

// Optional health checks
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/backend/api/health", (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found", url: req.originalUrl });
});

export default app;
