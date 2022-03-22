import { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    uid: String,
    email: String,
    password: String,
    bio: { type: String, default: "sussy amogus impostor" },
    pfp: { type: String, default: "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png" },
    location: { type: String, default: "The vent" },
    private: Boolean,
    creator: { Boolean, default: false },
    approved: { Boolean, default: false },
    followers: Number,
    userCreated: String,
    userAuth: String
})

export default userSchema;