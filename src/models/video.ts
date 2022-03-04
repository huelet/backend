import { Schema } from "mongoose";

const videoSchema = new Schema({
    vuid: String,
    url: String,
    title: String,
    description: String,
    authorId: String,
    private: Boolean,
    videoUploaded: Date,
    views: Number,
    upvotes: Number,
    downvotes: Number,
    shares: Number,
})

export default videoSchema;