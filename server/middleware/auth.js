import jwt from "jsonwebtoken";
import User from "../models/users.js"

const auth = async (req, res, next) => {
    const {authorization} = req.headers;
    // console.log(authorization);

    if (authorization) {
        // since we'll be sending token as "Bearer OUR_TOOKEN" so let's use split method
        const token = authorization.split(' ')[1];
        // console.log("TOKEN",token);

        try {
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
            // console.log(jwt.verify(token, process.env.SECRET_KEY)); // output is : { id: '64d8b19be6df2ac8a2f6480a', iat: 1692057869 }
            req.userId = await User.findById({_id : id}).select('_id');
            // console.log(req.userId);
            next();
        } catch (error) {
            res.status(401).json({err : "You are unauthorized"})
        }
    } else {
        return res.status(401).json({err : "Token not found"})
    }
}

export default auth;