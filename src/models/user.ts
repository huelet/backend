import { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    uid: String,
    email: String,
    phoneNumber: Number,
    password: String,
    bio: { type: String, default: "no bio" },
    pfp: { type: String, default: "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png" },
    location: { type: String, default: "no location" },
    private: Boolean,
    pronouns: Object,
    creator: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    followers: { type: Object, default: [] },
    videos: { type: Object, default: null },
    userCreated: Number,
    userAuth: Number
})

export default userSchema;