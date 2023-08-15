import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


/** CONFIGURATIONS */
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json())  // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })) //support parsing of application-form's-urlencoded post data
app.use(morgan("common"));
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // isi ke karan toh image dikhne laga
app.use(cors());
app.use(express.static(__dirname+'/public'))

/** SETTING UP THE ROUTES */
app.use("/", authRoutes);
app.use("/user", userRoutes);

/** DATABASE CONNECTION */
const DBConnection = async (url) => {
    const result = await mongoose.connect(process.env.MONGO_URL);
    if(result){
        app.listen(PORT, () => console.log(`Server running at ${PORT}`));
    }
}

DBConnection();