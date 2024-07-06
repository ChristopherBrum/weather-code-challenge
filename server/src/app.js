import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config.js";
dotenv.config();

import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/weather", routes);

export default app;
