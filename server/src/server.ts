import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./Database/database";
import userRouter from "./Routes/userRoute";
import adminRouter from "./Routes/adminRoute";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/admin", adminRouter);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, (error?: Error) => {
  if (!error) {
    console.log("Server running at port http://localhost:5000");
    connectDB();
  } else {
    console.error("Error occurred, The server can't start", error);
  }
});
