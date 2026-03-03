// Purpose
// App configuration
// Middlewares
// Routes registration

import express from "express";
import eventsRouter from "./routes/events.routes.js";
import leadersRouter from "./routes/leaders.routes.js";
import authRouter from "./routes/auth.routes.js";
import joinSccRouter from "./routes/join-scc.routes.js"
import sccLeadersRouter from "./routes/scc-leaders.routes.js"
import groupsRouter from "./routes/join-group.routes.js";
import readingsRouter from './routes/readings.routes.js';

//import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", eventsRouter);
app.use("/api", leadersRouter);
app.use("/api", sccLeadersRouter)
app.use("/api", groupsRouter);
app.use("/api", authRouter);
app.use("/api", joinSccRouter);
app.use("/api", readingsRouter);

export default app;
