/** Routes regarding user registration and user sign in */

import express from "express";
import {createUser, userlogin, getAllPost} from "../controllers/auth.js"

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", userlogin);
router.get("/", getAllPost);

export default router;