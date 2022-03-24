import express from "express";
import mongoose from "mongoose";
import userSchema from "../../models/user";

const setBio = async (req: express.Request, res: express.Response) => {
  try {
    let body: any = req.body;
    let bio = body.bio;
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: body.username });
    if (typeof bio !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid option. Stop being naughty.",
      });
      return;
    } else {
      await user.updateOne(
        { username: resp[0].username },
        {
          private: bio,
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

const getBio = async (req: express.Request, res: express.Response) => {
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
    };
    res.status(200).json({
      bio: resp[0].bio,
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

export { setBio, getBio };
