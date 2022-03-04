import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { signup, login } from "./src/auth/index";
import { getVideoInfo } from "./src/videos/index";
import db from "./src/utils/db";
import { authenticateToken, authenticateTokenRoute } from "./src/auth/jwt/token";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/videos/:vuid", getVideoInfo)
app.post("/auth/up", bodyParser.json(), signup);
app.post("/auth/in", bodyParser.json(), login);
app.get("/auth/token", authenticateTokenRoute);
app.post("/auth/privacy", bodyParser.json(), authenticateToken);

db();
app.listen(PORT,async () => {
    console.log(`Application is running at http://localhost:${PORT}`);
})