import { createCanvas, loadImage } from "canvas";
import express from "express";
import mongoose from "mongoose";
import userSchema from "../models/user";
const canvas = createCanvas(512, 1024);
const ctx = canvas.getContext("2d");

const createBadge = async (username, pfpUrl, timeCreated) => {
  const backgroundGradient = await loadImage(
    "https://cdn.huelet.net/assets/background%20gradient.png"
  );
  const avatar = await loadImage(pfpUrl);
  const logo = await loadImage(
    "https://cdn.huelet.net/assets/logo-transparent.png"
  );
  const timestamp = new Date(timeCreated * 1000);
  const formattedDate = `${timestamp.getDate()}.${timestamp.getMonth()}.${timestamp.getFullYear()}`;
  ctx.font = "64px Arial";
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.strokeStyle = "rgba(0, 0, 0, 1)";
  ctx.drawImage(backgroundGradient, -100, 0, 2048, 1024);
  ctx.drawImage(logo, 290, 800, 256, 256);
  ctx.drawImage(avatar, 64, 100, 384, 384);
  ctx.fillText(username.toUpperCase(), 64, 554);
  ctx.fillText("Creator", 64, 620);
  ctx.font = `32px Arial`;
  ctx.fillText(formattedDate, 80, 935);
  ctx.strokeRect(64, 900, 165, 52);

  const stream = canvas.createPNGStream();
};

createBadge("huelet", "https://cdn.huelet.net/assets/logo.png", 1656999249.166);

const badge = async (req: express.Request, res: express.Response) => {
  try {
    let date: any = new Date();
    const user = mongoose.model("users", userSchema);
    let resp = await user.find({ username: req.query.username });
    const backgroundGradient = await loadImage(
      "https://cdn.huelet.net/assets/background%20gradient.png"
    );
    const avatar = await loadImage(resp[0].pfp as string);
    const logo = await loadImage(
      "https://cdn.huelet.net/assets/logo-transparent.png"
    );
    const timestamp = new Date((resp[0].userCreated as number) * 1000);
    const formattedDate = `${timestamp.getDate()}.${timestamp.getMonth()}.${timestamp.getFullYear()}`;
    ctx.font = "64px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.drawImage(backgroundGradient, -100, 0, 2048, 1024);
    ctx.drawImage(logo, 290, 800, 256, 256);
    ctx.drawImage(avatar, 64, 100, 384, 384);
    ctx.fillText((req.query.username as string).toUpperCase(), 64, 554);
    ctx.fillText("Creator", 64, 620);
    ctx.font = `32px Arial`;
    ctx.fillText(formattedDate, 80, 935);
    ctx.strokeRect(64, 900, 165, 52);
    const url = canvas.toDataURL("image/png");
    const buffer = canvas.toBuffer("image/png");

    res.status(200).json({
      success: true,
      data: {
        badge: url,
        buffer: buffer,
        info: {
          badgeCreated: date / 1000,
          username: req.query.username as string,
          pfp: resp[0].pfp as string,
          userCreated: resp[0].userCreated as number,
        },
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
