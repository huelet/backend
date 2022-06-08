import express from "express";
import mongoose from "mongoose";
import userSchema from "../models/user";

const userLookup = async (req: express.Request, res: express.Response) => {
  try {
    const user = mongoose.model("users", userSchema);
    const resp = await user.find({ username: req.query.username });
    res.status(200).json(resp[0]);
    return;
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        response: `Error: ${err}`,
        errorCode: "0x11600",
        resolution:
          "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet",
      });
    return;
  }
};

export default userLookup;
