import express from "express";
import mongoose from "mongoose";
import { useID } from "@dothq/id";
import saltPassword from "../utils/salt";
import userSchema from "../models/user";
import { checkPwnedPwd, checkSafePwd } from "../utils/lib/pwdCheck";

const signup = async (req: express.Request, res: express.Response) => {
    try {
        let body = req.body;
        let password = body.password;
        let isPwdPwned = await checkPwnedPwd(password);
        let isPwdSafe = await checkSafePwd(password);
        if (isPwdPwned === true) {
            res.status(400).json({ response: `Error: Password compromised elsewhere`, errorCode: "0x00615", resolution: "Try another password, one that you haven't used before." });
            return;
        } else if (isPwdSafe.success !== true) {
            res.status(400).json({ response: `Error: your password suck`, errorCode: isPwdSafe.message, resolution: "Try another password or use the built-in password generator" });
            return;
        }
        const user = mongoose.model("users", userSchema);
        const newUser = new user({ username: body.username, uid: useID(), password: await saltPassword(password), userCreated: Date.now()/1000 })
        await newUser.save();
        res.status(200).json({ response: "Success!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ response: `Error: ${err}`, errorCode: "0x11600", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
    };
};

export default signup;