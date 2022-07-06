import express from "express";
import * as dotenv from "dotenv";
import search from "../utils/search";
import mongoose from "mongoose";
import videoSchema from "../models/video";

dotenv.config();

const searchVideos = async (
  req: any /* don't ask why this is randomly 'any' */,
  res: express.Response
) => {
  try {
    const resp = await search.index("videos").search(req.query.query);
    res.status(200).json({
      success: true,
      response: resp,
    });
    return;
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        response: `Error: ${err}`,
        errorCode: "yes",
        resolution:
          "Wait 15-20 minutes and try again. If it's not fixed, report a bug in the #bug-reports channel of our Discord server",
      });
    return;
  }
};
const addVideoToSearch = async (
  req: any /* don't ask why this is randomly 'any' */,
  res: express.Response
) => {
  try {
    res.status(200).json({
      success: true,
    });
    return;
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        response: `Error: ${err}`,
        errorCode: "yes",
        resolution:
          "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
      });
    return;
  }
};

export { addVideoToSearch, searchVideos };
