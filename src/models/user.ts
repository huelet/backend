import { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    uid: String,
    email: String,
    phoneNumber: Number,
    password: String,
    bio: { type: String, default: "sussy amogus impostor" },
    pfp: { type: String, default: "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png" },
    location: { type: String, default: "The vent" },
    private: Boolean,
    pronouns: Object,
    creator: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    followers: { type: Number, default: 0 },
    userCreated: String,
    userAuth: String
})

export default userSchema;