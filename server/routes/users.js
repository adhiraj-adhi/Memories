/** Routes related to user */

import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth.js";
import { createPost, getUsersPosts, getAPost, editPost, deletePost, likePost } from "../controllers/users.js"

const router = express.Router();

router.use(auth); // setting all the below route as protected

/** SETTING UP MULTER MIDDLEWARE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/postsImg');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + Math.round(Math.random() * 1000) + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });

router.post("/createPost", upload.single('image'), createPost);
router.get("/getUserPost/", getUsersPosts);
router.get("/getAPost/:postId", getAPost);
router.patch("/editPost/:postId",upload.single('image'), editPost);
router.delete("/deletePost/:postId", deletePost);
router.patch("/likePost/:postId", likePost);

export default router;