import express from "express";
import mongoose from "mongoose";
import userSchema from "../../models/user";

const setPronouns = async (req: express.Request, res: express.Response) => {
  try {
    let body: any = req.body;
    let pronouns = body.pronouns;
    const user: mongoose.Model<any, {}, {}, {}> = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: body.username });
    await user.updateOne(
      { username: resp[0].username },
      {
        pronouns: pronouns.split("/"),
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

const getPronouns = async (req: express.Request, res: express.Response) => {
  try {
    const user: any | any = mongoose.model(
      "users",
      userSchema
    );
    const resp: any[] = await user.find({ username: req.query.username });
    if (resp[0].private === true) {
      res.status(401).json({
        pronouns: "This account is private.",
      });
      return;
    };
    res.status(200).json({
      pronouns: resp[0].pronouns,
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

export { setPronouns, getPronouns };
