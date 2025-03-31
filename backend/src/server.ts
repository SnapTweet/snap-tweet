// server.ts
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", tweetRoutes);

export default app;
