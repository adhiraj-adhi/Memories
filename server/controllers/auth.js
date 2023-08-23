import multer from "multer";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";
import User from "../models/users.js";
import Post from "../models/posts.js";

/** hANDLING ERRORS */

let errorMessage = {
    name: "",
    email: "",
    password: "",
    signInErr: ""
}

function refresher() {
    errorMessage = {
        name: "",
        email: "",
        password: "",
        signInErr: ""
    }
}

const handleErrors = (error) => {
    refresher();
    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            errorMessage[properties.path] = properties.message;
        })
    }
    if (error.message === 'Passwords do not match') {
        errorMessage.password = 'Passwords do not match';
    }
    if (error.code === 11000) {
        errorMessage.email = 'Email Already Registered'
    }
    if (error.message === 'Invalid Credentials') {
        errorMessage.signInErr = 'Invalid Credentials'
    }

    return errorMessage;
}

/** SETTING UP MULTER MIDDLEWARE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/profilesImg');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1000) + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

/** AUTH CONTROLLERS */

export const createUser = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.password === req.body.confPassword) {
            const data = req.body;
            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            const result = await User.create(newUser)
            if (result) {
                res.status(201).json({
                    name: result.name,
                    email: result.email,
                });
            }
        } else {
            throw new Error("Passwords do not match")
        }
    } catch (error) {
        const errMsg = handleErrors(error);
        res.status(500).json({ errMsg })
    }
}

export const userlogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.password === req.body.password) {
                const token = jwt.sign({ id: user._id }, process.env.Secret_Key);
                console.log(token);
                res.status(200).json({
                    name: user.name,
                    email: user.email,
                    token: token
                })
            } else {
                throw new Error('Invalid Credentials');
            }
        } else {
            throw new Error('Invalid Credentials');
        }
    } catch (error) {
        const errMsg = handleErrors(error);
        res.status(500).json({ errMsg })
    }
}

/** GET ALL POSTS (THIS IS FOR SHOWING POST TO USER WITHOUT BEING LOGGED IN) */

export const getAllPost = async (req, res) => {
    // console.log(req.headers.usertoken);
    try {
        const posts = await Post.find();
        const {usertoken} = req.headers;
        if(usertoken){
            const {id} = jwt.verify(usertoken, process.env.SECRET_KEY);
            const userId = id;
            const data = posts.map(post => {
                return {
                    id: post._id,
                    author: post.author,
                    title: post.title,
                    description: post.description,
                    hashtags: post.hashtags,
                    postImgPath: post.postImgPath,
                    likes: post.likes.length,
                    hasUserLiked: post.likes.includes(userId),
                    createdAt: post.createdAt
                }
            })
            res.status(200).json(data)
        } else {
            const data = posts.map(post => {
                return {
                    id: post._id,
                    author: post.author,
                    title: post.title,
                    description: post.description,
                    hashtags: post.hashtags,
                    postImgPath: post.postImgPath,
                    likes: post.likes.length,
                    hasUserLiked: false,
                    createdAt: post.createdAt
                }
            })
            res.status(200).json(data)
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getSpecificPost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.postId)){
            throw new Error("Bad Request")
        }
        const result = await Post.findById({ _id: req.params.postId });
        const author_posts = await Post.find({ author: result.author });
        author_posts.sort((a, b) => b.likes.length - a.likes.length)
        let index;
        for (let i = 0; i < author_posts.length; i++) {
            if (author_posts[i]._id.toString() == result._id.toString()) {
                index = i;
                break;
            }
        }
        console.log(index);

        let author_popular_posts;
        if (author_posts.length <= 3) {
            author_popular_posts = author_posts;
        } else {
            if (index === 0) {
                author_popular_posts = [author_posts[1], author_posts[2], author_posts[3]]
            } else if (index === 1) {
                author_popular_posts = [author_posts[0], author_posts[2], author_posts[3]]
            } else if (index === 2) {
                author_popular_posts = [author_posts[0], author_posts[1], author_posts[3]]
            }
            else {
                author_popular_posts = [author_posts[0], author_posts[1], author_posts[2]]
            }
        }


        const data = {
            id: result._id,
            author: result.author,
            title: result.title,
            description: result.description,
            hashtags: result.hashtags,
            postImgPath: result.postImgPath,
            likes: result.likes.length,
            createdAt: result.createdAt
        }
        res.status(200).json({ data, posts: [...author_popular_posts] })
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
}