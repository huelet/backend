import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import videoSchema from "../models/video";
import { useID } from "@dothq/id";

dotenv.config();

const deployVideo = async (req: any /* don't ask why this is randomly 'any' */, res: express.Response) => {
  try {
      const body = req.body;
      console.log(body);
      const video = mongoose.model("videos", videoSchema);
      const newUser = new video({ vuid: useID(2), url: body.vurl, title: body.title, authorId: body.authorId, description: body.description, private: body.private });
      const resp = await newUser.save();
      console.log(resp);
      res.status(200).json({
          success: true
      });
  } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
  }
};

export { deployVideo };
     