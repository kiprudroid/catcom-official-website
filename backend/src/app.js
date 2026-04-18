import express, { Router } from "express";
import path from "path";
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

const uploadsDir = path.join(process.cwd(), "public/uploads");

app.use("/uploads", express.static(uploadsDir));
app.use(cors());
app.use(express.json());

// Temporary tracing to see exactly what Passenger/LiteSpeed forwards
app.use((req, _res, next) => {
  console.log(
    `[REQ] originalUrl=${req.originalUrl} url=${req.url} baseUrl=${req.baseUrl}`,
  );
  next();
});

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

// Mount for all common path variants
app.use("/api", apiRouter);
app.use("/backend/api", apiRouter);
app.use("/", apiRouter); // fallback if upstream strips both /backend and /api

// Health checks for each variant
app.get("/health", (_req, res) =>
  res.status(200).json({ ok: true, where: "/health" }),
);
app.get("/api/health", (_req, res) =>
  res.status(200).json({ ok: true, where: "/api/health" }),
);
app.get("/backend/api/health", (_req, res) =>
  res.status(200).json({ ok: true, where: "/backend/api/health" }),
);

app.use(errorHandler);

// 404 with marker + request info for debugging
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    marker: "backend-routing-v2",
    originalUrl: req.originalUrl,
    url: req.url,
  });
});

export default app;
