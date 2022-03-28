import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const verifyCaptcha = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.body && req.body.token;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (!token) {
    res.status(401).json({
      response: "Error: No token provided",
      errorCode: "0x00610",
      resolution: "Report this bug in #bug-reports of our Discord server.",
    });
  }
  const resp = await axios.post("https://hcaptcha.com/siteverify", {
    data: {
      secret: process.env.HCAPTCHA_SECRET,
      response: token,
      remoteip: ip,
      sitekey: "93fc8c73-f7bc-4431-b17c-e04daed89ffd",
    },
  });
  console.log(resp);
  if (resp.data.success === true) {
    next();
  } else {
    console.log(resp);

    res.status(401).json({
      response: "Error: Invalid token",
      errorCode: "0x00611",
      resolution: "Report this bug in #bug-reports of our Discord server.",
    });
  }
};

export { verifyCaptcha };
