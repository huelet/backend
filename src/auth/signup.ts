import express from "express";
import mongoose from "mongoose";
import { useID } from "@dothq/id";
import saltPassword from "../utils/salt";
import userSchema from "../models/user";
import { checkPwnedPwd, checkSafePwd } from "../utils/lib/pwdCheck";
import betacodes from "../utils/lib/resources/betacodes";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const signup = async (req: express.Request, res: express.Response) => {
    try {
        let jwtSecret: any | any = process.env.JWT_SECRET;
        let body = req.body;
        let password = body.password;
        let isPwdPwned = await checkPwnedPwd(password);
        let isPwdSafe = await checkSafePwd(password);
        const user = mongoose.model("users", userSchema);
        const resp = await user.find({ username: body.username });
        console.log(resp[0]);
        if (isPwdPwned === true) {
            res.status(400).json({ response: `Error: Password compromised elsewhere`, errorCode: "0x00615", resolution: "Try another password, one that you haven't used before." });
            return;
        } else if (isPwdSafe.success !== true) {
            res.status(400).json({ response: `Error: Your password does not meet the specified guidelines.`, errorCode: isPwdSafe.message, resolution: "Try another password or use the built-in password generator" });
            return;
        } else if (!betacodes.codes.includes(body.accessCode) || !body.accessCode) {
            res.status(403).json({ response: `Error: Alpha code is not valid`, errorCode: "0x10703", resolution: "Double-check that your alpha code is correct, or that you provided one in the first place" });
            return;
        } else if (resp[0]) {    
            res.status(400).json({ response: `Error: Username is already taken`, errorCode: "0x00611", resolution: "Try another username" });
            return;
        }
        const newUser = new user({ username: body.username, uid: useID(), password: await saltPassword(password), userCreated: Date.now()/1000 })
        await newUser.save();
        const token = jwt.sign({ username: body.username}, jwtSecret, { expiresIn: '31d' })
        res.status(200).json({ response: "Success!", token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ response: `Error: ${err}`, errorCode: "0x11600", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
    };
};

export default signup;