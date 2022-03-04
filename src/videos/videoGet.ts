import express from "express";
import mongoose from "mongoose";
import videoSchema from "../models/video";

const getVideoInfo = async (req: express.Request, res: express.Response) => {
    try {
        let { vuid } = req.params;
        const video = mongoose.model("videos", videoSchema);
        const resp = await video.find({ vuid: vuid });
        const data = resp[0];
        res.status(200).json({
            vtitle: data.title,
            vurl: data.url,
            vdesc: data.description,
            vauthor: data.authorId,
            vdate: data.videoUploaded,
            vviews: data.views,
            vclaps: data.upvotes,
            vcraps: data.downvotes,
            vshares: data.shares
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
    }
}

export { getVideoInfo };