import express from "express";
import mongoose from "mongoose";
import { useID } from "@dothq/id";
import saltPassword from "../utils/salt";
import userSchema from "../models/user";

const signup = async (req: express.Request, res: express.Response) => {
    try {
        let body = req.body;
        const user = mongoose.model("users", userSchema);
        const newUser = new user({ username: body.username, uid: useID(), password: await saltPassword(body.password), userCreated: Date.now()/1000 })
        await newUser.save();
        res.sendStatus(200).json({ response: "Success!" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ response: `Error: ${err}`, errorCode: "0x11600", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
    };
};

export default signup;