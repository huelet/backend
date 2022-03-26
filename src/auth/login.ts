import express from "express";
import mongoose from "mongoose";
import { hashString } from "../utils/hash";
import userSchema from "../models/user";

const login = async (req: express.Request, res: express.Response) => {
    try {
        let body = req.body;
        const user = mongoose.model("users", userSchema);
        const resp = await user.find({ username: body.username });
        const [salt, key] = resp[0].password.split(":");
        const hashedPassword = await hashString(body.password)
        if (hashedPassword === key) {
            res.status(200).json({ response: "Success!" })
            return;
        } else {
            res.status(401).json({ response: `Error: Invalid password!`, errorCode: "0x00610", resolution: "Double-check your password and make sure it's right." })
            return;
        }
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ response: `Error: ${err}`, errorCode: "0x11600", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
        return;
    }
};

export default login;