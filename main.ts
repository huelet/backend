import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { signup } from "./src/auth/index";
import db from "./src/utils/db";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/auth", bodyParser.json(), signup);

db();
app.listen(PORT,async () => {
    console.log(`Application is running at http://localhost:${PORT}`);
})