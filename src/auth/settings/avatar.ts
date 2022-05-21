import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import userSchema from "../../models/user";
import * as dotenv from "dotenv";

dotenv.config();

const setPfp = async (req: express.Request, res: express.Response) => {
  try {
    let body: any = req.body;
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: body.username });
    await user.updateOne(
      { username: resp[0].username },
      {
        pfp: body.url,
      }
    );
    res.status(200).json({
      success: true,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "0x11600",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
    });
  }
};

const uploadPfp = async (req: any, res: express.Response) => {
  try {
    const avatarUrl = req.files[0].url;
    const fullAvatarUrl = `${avatarUrl.replace(
      "hueletuseravatars.blob.core.windows.net",
      "avatars.hueletusercontent.com"
    )}${process.env.AVATAR_STORAGE_SAS_TOKEN}`;
    const safetycheck = await axios.get(
      "https://api.sightengine.com/1.0/check.json",
      {
        params: {
          url: fullAvatarUrl,
          models: "nudity,wad,offensive,gore",
          api_user: "39826996",
          api_secret: process.env.SIGHTENGINE_API_KEY,
        },
      }
    );
    console.log(safetycheck.data);
    if (
      safetycheck.data.weapon >= 0.95 ||
      safetycheck.data.offensive.prob >= 0.95
    ) {
      res.status(401).json({
        success: false,
        response: "This image is not suitable for use as a profile picture.",
      });
      return;
    } else if (
      safetycheck.data.nudity.safe <= 0.15 &&
      safetycheck.data.nudity.partial <= 0.01
    ) {
      res.status(401).json({
        success: false,
        response: "This image is not suitable for use as a profile picture.",
      });
      return;
    } else if (safetycheck.data.nudity.raw >= 0.8) {
      res.status(401).json({
        success: false,
        response: "This image is not suitable for use as a profile picture.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      pfp: fullAvatarUrl,
    });
    return;
  } catch (err) {
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "0x11600",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
    });
  }
};

const getPfp = async (req: express.Request, res: express.Response) => {
  try {
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: req.query.username });
    if (resp[0].private === true) {
      res.status(401).json({
        bio: "This account is private.",
      });
      return;
    }
    res.status(200).json({
      pfp: resp[0].pfp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "0x11600",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
    });
  }
};

export { setPfp, uploadPfp, getPfp };
