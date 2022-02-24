import express from "express";
import mongoose from "mongoose";
import { hashString } from "../utils/hash";
import userSchema from "../models/user";

const login = async (req: express.Request, res: express.Response) => {
    let body = req.body;
    const user = mongoose.model("users", userSchema);
    const resp = await user.find({ username: body.username });
    const [salt, key] = resp[0].password.split(":");
    const hashedPassword = await hashString(body.password)
    if (hashedPassword === key) {
        res.send("success!")
    } else {
        res.send("screw you")
    }
};

export default login;