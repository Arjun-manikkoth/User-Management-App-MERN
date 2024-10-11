import mongoose from "mongoose";

const url: string = process.env.MONGODB_URI || "";

//database connection
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
};
