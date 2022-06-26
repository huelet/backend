import { Schema } from "mongoose";

const videoSchema = new Schema({
    vuid: String,
    url: String,
    title: String,
    description: { type: String, default: " " },
    thumbnail: String,
    authorId: String,
    private: { type: Boolean, default: false },
    videoUploaded: String,
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Object, default: {} },
})

export default videoSchema;