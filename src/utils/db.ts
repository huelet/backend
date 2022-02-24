import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const db = async () => {
    let mongodbUrl: string | any = process.env.MONGO_URL;
    await mongoose.connect(mongodbUrl);
};

export default db;

