import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { signup, login } from "./src/auth/index";
import { getVideoInfo, postVideoToCDN, deployVideo } from "./src/videos/index";
import db from "./src/utils/db";
import { authenticateToken, authenticateTokenRoute } from "./src/auth/jwt/token";
import bodyParser from "body-parser";
import multer from "multer";
import { useID } from "@dothq/id";
const multerAzure = require("mazure");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://huelet.net',
  optionsSuccessStatus: 200
}));

const upload = multer({
    storage: multerAzure({
      connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
      account: process.env.AZURE_STORAGE_ACCOUNT_NAME,
      key: process.env.AZURE_STORAGE_KEY,
      container: `videoasset-${useID(2)}-${Math.floor(Date.now() / 1000)}`,
    }),
  });

app.get("/videos/:vuid", getVideoInfo)
app.post("/videos/upload/item", upload.any(), postVideoToCDN)
app.post("/videos/deploy/item", bodyParser.json(), deployVideo)
app.post("/auth/up", bodyParser.json(), signup);
app.post("/auth/in", bodyParser.json(), login);
app.get("/auth/token", authenticateTokenRoute);
app.post("/auth/privacy", bodyParser.json(), authenticateToken);

db();
app.listen(PORT,async () => {
    console.log(`Application is running at http://localhost:${PORT}`);
})