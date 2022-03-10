import { Schema } from "mongoose";

const videoSchema = new Schema({
    vuid: String,
    url: String,
    title: String,
    description: { type: String, default: " " },
    authorId: String,
    private: { type: Boolean, default: false },
    videoUploaded: Date,
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
})

export default videoSchema;