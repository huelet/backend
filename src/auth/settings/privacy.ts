import express from "express";
import mongoose from "mongoose";
import userSchema from "../../models/user";

const setPrivacy = async (req: express.Request, res: express.Response) => {
  try {
    let body: any = req.body;
    let privacyStatus = body.privacyStatus;
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: body.username });
    if (typeof privacyStatus !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Invalid option. Stop being naughty.",
      });
      return;
    } else {
      await user.updateOne(
        { username: resp[0].username },
        {
          private: privacyStatus,
        }
      );
      res.status(200).json({
        success: true,
      });
      return;
    }
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

const getPrivacy = async (req: express.Request, res: express.Response) => {
  try {
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: req.query.username });
    res.status(200).json({
      privacyStatus: resp[0].private,
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

export { setPrivacy, getPrivacy };
