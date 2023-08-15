import multer from "multer";
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
                const token = jwt.sign({id : user._id}, process.env.Secret_Key);
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
    try {
        const posts = await Post.find();
        const data =  posts.map(post => {
            return {   
                id: post._id,
                author: post.author,
                title: post.title,
                description: post.description,
                hashtags: post.hashtags,
                postImgPath: post.postImgPath,
                likes: post.likes.length
            }
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}