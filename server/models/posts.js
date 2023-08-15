import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    postImgPath: {
        type: String,
        default: ""
    },
    hashtags: {
        type: String,
        trim: true
    },
    likes: {
        type: Array,
        default: []
    },
}, {timestamps: true})

const Post = new mongoose.model("posts", postSchema);

export default Post;