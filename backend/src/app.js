// Purpose
// App configuration
// Middlewares
// Routes registration

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

//import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Keep uploads path exactly as your multer config expects:
// backend/src/app.js -> backend/src -> backend -> uploads
const uploadsDir = path.join(__dirname, "../uploads");

// Serve uploaded files publicly
app.use("/uploads", express.static(uploadsDir));

app.use(cors());
app.use(express.json());
app.use("/api", eventsRouter);
app.use("/api", leadersRouter);
app.use("/api", sccLeadersRouter);
app.use("/api", groupsRouter);
app.use("/api", authRouter);
app.use("/api", joinSccRouter);
app.use("/api", readingsRouter);

app.use(errorHandler);

//404 not found
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
