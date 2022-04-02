import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import verifySchema from "../models/verify";
import { hashString } from "../utils/hash";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyAuth = async (req: express.Request, res: express.Response) => {
  try {
    let body = req.body;
    let jwtSecret: any | any = process.env.JWT_SECRET;
    const auth = mongoose.model("verification", verifySchema);
    const resp = await auth.findOne({ authId: body.authId });
    if (resp) {
      const submittedCode = await hashString(body.authCode);
      if (resp.authCode === submittedCode) {
        await auth.deleteOne({ authId: body.authId });
        const token = jwt.sign({ username: resp.username }, jwtSecret, {
          expiresIn: "31d",
        });
        res.status(200).json({ response: "Success!", token: token });
        return;
      } else {
        res.status(401).json({
          response: `Error: Invalid auth code!`,
          errorCode: "0x00610",
          resolution: "Double-check your auth code and make sure it's right.",
        });
        return;
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        response: `Error: ${err}`,
        errorCode: "0x11600",
        resolution:
          "Wait 15-20 minutes and try again. If it's not fixed, report a bug in the #bug-reports channel on discord",
      });
    return;
  }
};

export default verifyAuth;
