// src/app.js
import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

export default app;
