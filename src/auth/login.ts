import express from "express";
import mongoose from "mongoose";
import { useID } from "@dothq/id";
import saltPassword from "../utils/salt";
import userSchema from "../models/user";

const login = async (req: express.Request, res: express.Response) => {
    let body = req.body;
    res.send("testing!!")
    const user = mongoose.model("users", userSchema);
    const newUser = new user({ username: body.username, uid: useID(), password: await saltPassword(body.password), userCreated: Date.now()/1000 })
    const resp = await newUser.save();
    console.log(resp);
};

export default login;