// Purpose
// App configuration
// Middlewares
// Routes registration

import express from "express";
import eventsRouter from "./routes/events.routes.js";
import leadersRouter from "./routes/leaders.routes.js";
import groupsRouter from "./routes/joinGroup.routes.js";
//import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", eventsRouter);
app.use("/api", leadersRouter);
app.use("/api", groupsRouter);
//app.use(errorHandler);

export default app;
