import express from "express";
import mongoose from "mongoose";
import { hashString } from "../utils/hash";
import * as dotenv from "dotenv";
import userSchema from "../models/user";
import verifySchema from "../models/verify";
import sendEmail from "../utils/mail/verifyEmail";
import { useID } from "@dothq/id";
import jwt from "jsonwebtoken";

dotenv.config();

const login = async (req: express.Request, res: express.Response) => {
  try {
    let body = req.body;
    let jwtSecret: any | any = process.env.JWT_SECRET;
    const user = mongoose.model("users", userSchema);
    const auth = mongoose.model("verification", verifySchema);
    if (req.query.creator === "true") {
      const resp = await user.findOne({
        email: body.email,
        creator: true
      });
      if (!resp) {
        res.status(401).json({
          response: `Error: User not found!`,
          errorCode: "0x00601",
          resolution: "Double-check your email and make sure it's right.",
        });
        return;
      }
      const [salt, key]: any | any = resp?.password?.split(":");
      const hashedPassword = await hashString(body.password);
      if (hashedPassword === key) {
        const token = jwt.sign({ username: resp.username }, jwtSecret, {
          expiresIn: "31d",
        });
        res.status(200).json({ response: "Success!", token: token });
        return;
      } else {
        res.status(401).json({
          response: `Error: Invalid password!`,
          errorCode: "0x00610",
          resolution: "Double-check your password and make sure it's right.",
        });
        return;
      }
    } else if (req.query.creator === "false" || !req.query.creator) {
      const resp = await user.find({ username: body.username });
      const [salt, key]: any | any = resp[0]?.password?.split(":");
      const hashedPassword = await hashString(body.password);
      if (hashedPassword === key) {
        const token = jwt.sign({ username: body.username }, jwtSecret, {
          expiresIn: "31d",
        });
        res.status(200).json({ response: "Success!", token: token });
        return;
      } else {
        res.status(401).json({
          response: `Error: Invalid password!`,
          errorCode: "0x00610",
          resolution: "Double-check your password and make sure it's right.",
        });
        return;
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "0x11600",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
    });
    return;
  }
};

export default login;
