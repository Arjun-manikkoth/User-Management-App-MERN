import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  phone: string;
  password: string;
  isDeleted: Number;
  url: string;
}

const userSchema: Schema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  isDeleted: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
  },
});
const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;
