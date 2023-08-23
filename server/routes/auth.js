/** Routes regarding user registration and user sign in */

import express from "express";
import {createUser, userlogin, getAllPost, getSpecificPost} from "../controllers/auth.js"

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", userlogin);
router.get("/", getAllPost);
router.get("/:postId", getSpecificPost);

export default router;