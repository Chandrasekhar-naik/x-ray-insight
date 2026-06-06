import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

async function startServer(){
    try {
        await connectDB();
        app.listen(port,()=>{
            console.log("backend is running")
        })
    } catch(err) {
        console.error("failed to start the server",err);
        process.exit(1);
    }
}
startServer();
app.use("/auth", authRoutes);
