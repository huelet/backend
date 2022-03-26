import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const postVideoToCDN = async (req: any /* don't ask why this is randomly 'any' */, res: express.Response) => {
  try {
    const url: any = req.files[0]!?.url
    const fullUrl = `${url.replace("hueletvideostorage.blob.core.windows.net", "videos.cdn.huelet.net")}${process.env.AZURE_SAS_TOKEN}`
    res.json({
      vurl: fullUrl,
      success: true,
    })
  } catch (err) {
      console.log(err);
      res.status(500).json({ response: `Error: ${err}`, errorCode: "yes", resolution: "Wait 15-20 minutes and try again. If it's not fixed, report a bug by pinging us on twitter @TeamHuelet" });
  }
};

export { postVideoToCDN };
     