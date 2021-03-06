import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {
  signup,
  login,
  badge,
  verifyAuth,
  userLookup,
  setPrivacy,
  getPrivacy,
  setBio,
  getBio,
  getPfp,
  uploadPfp,
  setPfp,
  getPronouns,
  setPronouns,
  getLocation,
  setLocation,
} from "./src/auth/index";
import { getVideoInfo, postVideoToCDN, deployVideo } from "./src/videos/index";
import {
  upvoteVideo,
  downvoteVideo,
  getComments,
  addComment,
} from "./src/interact/index";
import db from "./src/utils/db";
import {
  authenticateToken,
  authenticateTokenRoute,
} from "./src/auth/jwt/token";
import { searchVideo } from "./src/search";
import bodyParser from "body-parser";
import multer from "multer";
import { useID } from "@dothq/id";
const multerAzure = require("mazure");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.set("trust proxy", true);

const videoUpload = multer({
  storage: multerAzure({
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    account: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    key: process.env.AZURE_STORAGE_KEY,
    container: `videoasset-${useID(2)}-${Math.floor(Date.now() / 1000)}`,
  }),
});

const avatarUpload = multer({
  storage: multerAzure({
    connectionString: process.env.AVATAR_STORAGE_CONNECTION_STRING,
    account: process.env.AVATAR_STORAGE_ACCOUNT_NAME,
    key: process.env.AVATAR_STORAGE_KEY,
    container: `profileimage-${useID(2)}-${Math.floor(Date.now() / 1000)}`,
  }),
});

app.get("/videos/lookup/:vuid", getVideoInfo);
app.post("/videos/upload/item", videoUpload.any(), postVideoToCDN);
app.post("/videos/deploy/item", bodyParser.json(), deployVideo);
app.post("/videos/interact/upvote/:vuid", bodyParser.json(), upvoteVideo);
app.post("/videos/interact/downvote/:vuid", bodyParser.json(), downvoteVideo);
app.get("/videos/interact/comments/:vuid", getComments);
app.post("/videos/interact/comments/:vuid", bodyParser.json(), addComment);
app.delete("/videos/interact/comments/:vuid");
app.get("/videos/search", bodyParser.json(), searchVideo);
app.post("/auth/up", bodyParser.json(), signup);
app.post("/auth/in", bodyParser.json(), login);
app.post("/auth/verify", bodyParser.json(), verifyAuth);
app.get("/auth/token", authenticateTokenRoute);
app.get("/auth/user", userLookup);
app.get("/auth/privacy", authenticateToken, getPrivacy);
app.post("/auth/privacy", bodyParser.json(), authenticateToken, setPrivacy);
app.get("/auth/bio", getBio);
app.patch("/auth/bio", bodyParser.json(), authenticateToken, setBio);
app.get("/auth/pfp", getPfp);
app.post("/auth/pfp", avatarUpload.any(), uploadPfp);
app.patch("/auth/pfp", bodyParser.json(), authenticateToken, setPfp);
app.get("/auth/pronouns", getPronouns);
app.patch("/auth/pronouns", bodyParser.json(), authenticateToken, setPronouns);
app.get("/auth/location", bodyParser.json(), getLocation);
app.patch("/auth/location", bodyParser.json(), authenticateToken, setLocation);
app.get("/auth/badge", authenticateToken, badge);

db();
app.listen(PORT, async () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
