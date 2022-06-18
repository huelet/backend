import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import videoSchema from "../models/video";
import { useID } from "@dothq/id";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import bodyParser from "body-parser";

dotenv.config();
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  headerPrefix: "comments-",
  langPrefix: "comments-language--",
  sanitizer: (text) => sanitizeHtml(text),
});

const addComment = async (
  req: any /* don't ask why this is randomly 'any' */,
  res: express.Response
) => {
  try {
    const video = mongoose.model("videos", videoSchema);
    const resp = await video.find({ vuid: req.params.vuid });
    if (!resp[0].comments[0]) {
      let updatedComment = [
        {
          content: marked.parse(req.body.content),
          id: useID(),
          upvotes: 0,
          downvotes: 0,
          commentPublished: Math.floor(Date.now() / 1000),
          author: req.body.username,
        },
      ];
      await video.updateOne(
        { vuid: req.params.vuid },
        {
          comments: updatedComment,
        }
      );
    } else if (resp[0].comments[0]) {
      let updatedComment = [
        resp[0].comments[0],
        {
          content: marked.parse(req.body.content),
          id: useID(),
          upvotes: 0,
          downvotes: 0,
          commentPublished: Math.floor(Date.now() / 1000),
          author: req.body.username,
        },
      ];
      await video.updateOne(
        { vuid: req.params.vuid },
        {
          comments: updatedComment,
        }
      );
    }
    res.status(200).json({
      success: true,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "yes",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
    });
    return;
  }
};
const getComments = async (
  req: any /* don't ask why this is randomly 'any' */,
  res: express.Response
) => {
  try {
    const video = mongoose.model("videos", videoSchema);
    const resp = await video.find({ vuid: req.params.vuid });
    res.status(200).json({
      comments: resp[0].comments[1],
      success: true,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "yes",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
    });
    return;
  }
};

export { getComments, addComment };
