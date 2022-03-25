import express from "express";
import mongoose from "mongoose";
import userSchema from "../../models/user";

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
    res.status(200).json({
      pfp: `${req.files[0]!?.url.replace("hueletuseravatars.blob.core.windows.net", "avatars.hueletusercontent.com")}${process.env.AVATAR_STORAGE_SAS_TOKEN}`,
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
}

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
