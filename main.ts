import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { signup, login, userLookup, setPrivacy, getPrivacy } from "./src/auth/index";
import { getVideoInfo, postVideoToCDN, deployVideo } from "./src/videos/index";
import { upvoteVideo, downvoteVideo } from "./src/interact/index";
import db from "./src/utils/db";
import { authenticateToken, authenticateTokenRoute } from "./src/auth/jwt/token";
import bodyParser from "body-parser";
import multer from "multer";
import { useID } from "@dothq/id";
const multerAzure = require("mazure");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

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
app.post("/videos/interact/upvote/:vuid", bodyParser.json(), upvoteVideo)
app.post("/videos/interact/downvote/:vuid", bodyParser.json(), downvoteVideo)
app.post("/videos/interact/comments/:vuid")
app.get("/videos/interact/comments/:vuid")
app.delete("/videos/interact/comments/:vuid")
app.post("/auth/up", bodyParser.json(), signup);
app.post("/auth/in", bodyParser.json(), login);
app.get("/auth/token", authenticateTokenRoute);
app.get("/auth/user/:uid", userLookup);
app.get("/auth/privacy", bodyParser.json(), authenticateToken, getPrivacy);
app.post("/auth/privacy", bodyParser.json(), authenticateToken, setPrivacy);

db();
app.listen(PORT,async () => {
    console.log(`Application is running at http://localhost:${PORT}`);
})