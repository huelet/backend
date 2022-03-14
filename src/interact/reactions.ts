import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import videoSchema from "../models/video";
import { useID } from "@dothq/id";

dotenv.config();

const upvoteVideo = async (req: any /* don't ask why this is randomly 'any' */, res: express.Response) => {
    try {
        const video = mongoose.model("videos", videoSchema);
        const resp = await video.find({ vuid: req.params.vuid });
        await video.updateOne({vuid: req.params.vuid}, {
            upvotes: resp[0].upvotes + 1
        })
        res.status(200).json({
            success: true
        });
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
        return;
    }
  };
  const downvoteVideo = async (req: any /* don't ask why this is randomly 'any' */, res: express.Response) => {
    try {
        const video = mongoose.model("videos", videoSchema);
        const resp = await video.find({ vuid: req.params.vuid });
        await video.updateOne({vuid: req.params.vuid}, {
            downvotes: resp[0].upvotes + 1
        })
        res.status(200).json({
            success: true
        });
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
        return;
    }
  };
  
  export { upvoteVideo, downvoteVideo };
       