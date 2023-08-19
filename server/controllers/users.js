/** CONTROLLERS :
 * createPost = creating a post
 * getUsersPosts = returns all the posts of the user
 * editPost = for allowing the user to edit their post
 * deletePost = for allowing the user to delete their post
 * likePost = liking and disliking of posts
*/

import User from "../models/users.js"
import Post from "../models/posts.js"
import path from "path";
import fs from "fs";


export const createPost = async (req, res) => {
    const newPost = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        hashtags: req.body.hashtags,
        postImgPath: req.file.filename
    }
    try {
        const result = await Post.create(newPost);
        const user = await User.findById(req.userId);
        user.posts.push(result._id);
        await user.save()
        res.status(201).json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getUsersPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const userPost = await Promise.all(user.posts.map(id => Post.findById(id.toString())
        ));
        console.log(userPost);

        userPost.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        const data = userPost.map(post => {
            return {
                id: post._id,
                author: post.author,
                title: post.title,
                description: post.description,
                hashtags: post.hashtags,
                postImgPath: post.postImgPath,
                likes: post.likes.length,
                createdAt: post.createdAt,
            }
        })
        // console.log(userPost);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const getAPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json({
            id: post._id,
            author: post.author,
            title: post.title,
            description: post.description,
            hashtags: post.hashtags
        })
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
}

export const editPost = async (req, res) => {
    try {
        const post = await Post.findById({ _id: req.params.postId });
        let updates = {
            ...post._doc,
            author : req.body.author,
            title : req.body.title,
            description: req.body.description,
            hashtags: req.body.hashtags
        };
        if (req.file) {
            fs.unlink(`public/postsImg/${post.postImgPath}`, (err) => {
                if (err) throw err;
            })
            updates = {
                ...post._doc,
                ...updates,
                postImgPath: req.file.filename
            }
        }

        const result = await Post.findOneAndUpdate({ _id: req.params.postId }, updates);
        console.log("RRRREEEESS",result);
        res.status(200).json({ mssg: "updated" })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        // console.log(req.userId._id); // o/p : { _id: new ObjectId("64d8b19be6df2ac8a2f6480a") }
        // console.log(req.userId._id); // O/p : new ObjectId("64d8b19be6df2ac8a2f6480a")
        const user = await User.findById({ _id: req.userId._id });
        console.log(user);
        const index = user.posts.indexOf(req.params.postId);
        const deletedDoc = await Post.findByIdAndDelete({ _id: req.params.postId });
        user.posts.splice(index, 1);
        await user.save();

        fs.unlink(`public/postsImg/${deletedDoc.postImgPath}`, (err) => {
            if (err) throw err;
        })

        res.status(200).json({ mssg: "Deleted" })
    } catch (error) {
        res.status(401).json({ err: error.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        post.likes.includes(req.userId._id) ? post.likes.splice(post.likes.indexOf(req.userId._id), 1) : post.likes.push(req.userId._id);
        await post.save();
        res.status(200).json({ mssg: "like updated" })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}