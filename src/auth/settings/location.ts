import express from "express";
import mongoose from "mongoose";
import userSchema from "../../models/user";

const setLocation = async (req: express.Request, res: express.Response) => {
  try {
    let body: any = req.body;
    let location = body.location;
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: body.username });
    if (typeof location !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid option. Stop being naughty.",
      });
      return;
    } else {
      await user.updateOne(
        { username: resp[0].username },
        {
          location: location,
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
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug in the #bug-reports channel on discord",
    });
  }
};

const getLocation = async (req: express.Request, res: express.Response) => {
  try {
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: req.query.username });
    if (resp[0].private === true) {
      res.status(401).json({
        location: "This account is private.",
      });
      return;
    };
    res.status(200).json({
      location: resp[0].location,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
      errorCode: "0x11600",
      resolution:
        "Wait 15-20 minutes and try again. If it's not fixed, report a bug in the #bug-reports channel on discord",
    });
  }
};

export { setLocation, getLocation };
