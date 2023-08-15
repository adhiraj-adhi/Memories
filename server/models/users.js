import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password can't be empty"],
        trim: true,
        minlength: [3, "Password must be atleast 3 characters long"]
    },
    profilePath: {
        type: String,
        default: ""
    },
    posts: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

export default User;