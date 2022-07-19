import express from "express";
import mongoose from "mongoose";
import userSchema from "../models/user";

const userLookup = async (req: express.Request, res: express.Response) => {
  try {
    const user = mongoose.model("users", userSchema);
    let resp = await user.find({ username: req.query.username });
    if (!resp[0]) {
      resp = await user.find({ uid: req.query.uid });
    }
    res.status(200).json({
      success: true,
      data: {
        uid: resp[0].uid,
        username: resp[0].username,
        email: resp[0].email,
        bio: resp[0].bio,
        avatar: resp[0].pfp,
        pronouns: resp[0].pronouns,
        location: resp[0].location,
        followers: resp[0].followers,
        creator: resp[0].creator,
        approved: resp[0].approved,
      },
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
    return;
  }
};

export default userLookup;
