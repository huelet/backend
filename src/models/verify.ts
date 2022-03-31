import { Schema } from "mongoose";

const verifySchema = new Schema({
    authId: String,
    authCode: String,
    status: String,
    username: String,
    uid: String,
})

export default verifySchema;