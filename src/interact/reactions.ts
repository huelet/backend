import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import videoSchema from "../models/video";
import { useID } from "@dothq/id";

dotenv.config();

const upvoteVideo = async (req: any /* don't ask why this is randomly 'any' */, res: express.Response) => {
    try {
        const video = mongoose.model("videos", videoSchema);
        const resp: mongoose.Document<any> | any = await video.find({ vuid: req.params.vuid });
        let upvotes = resp[0].upvotes;
        upvotes = resp[0].upvotes + 1

        await video.updateOne({vuid: req.params.vuid}, {
            upvotes: upvotes
        })
        res.status(200).json({
            success: true
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
        return;
    }
  };
  const downvoteVideo = async (req: any /* don't ask why this is randomly 'any' */, res: express.Response) => {
    try {
        const video = mongoose.model("videos", videoSchema);
        const resp: mongoose.Document<any> | any = await video.find({ vuid: req.params.vuid });
        let upvotes = resp[0].upvotes;
        upvotes = resp[0].upvotes + 1
        
        await video.updateOne({vuid: req.params.vuid}, {
            downvotes: upvotes
        })
        res.status(200).json({
            success: true
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
        return;
    }
  };
  
  export { upvoteVideo, downvoteVideo };
       