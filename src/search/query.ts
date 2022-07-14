import express from "express";
import { search } from "../utils/search";

const searchVideo = async (req: express.Request, res: express.Response) => {
  try {
    const resp = await search.search(req.query.searchContent as string);
    res.status(200).json({
      success: true,
      data: resp,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: `Error: ${err}`,
    });
  }
};

export { searchVideo };
