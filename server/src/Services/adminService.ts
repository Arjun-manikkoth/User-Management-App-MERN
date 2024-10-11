import Admin, { IAdmin } from "../Models/adminModel";
import bcrypt from "bcrypt";
import User, { IUser } from "../Models/userModel";
import mongoose from "mongoose";

class AdminService {
  async checkAdmin(email: string): Promise<IAdmin | null> {
    try {
      return await Admin.findOne({ email: email });
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }
  async verifyPassword(
    enteredPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(enteredPassword, storedPassword);
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }
  async getAllUsers(): Promise<any[]> {
    try {
      return await User.find({});
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }
  async createUser(userData: IUser): Promise<IUser | null> {
    try {
      const isExist = await User.findOne({ email: userData.email });

      if (!isExist) {
        const hashPassword = await bcrypt.hash(userData.password, 10);

        const user = new User({
          name: userData.userName,
          email: userData.email,
          password: hashPassword,
          phone: userData.phone,
        });

        const data = await user.save();
        return data;
      }

      return null;
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }
  async deleteStudent(id: string): Promise<boolean> {
    try {
      const result = await User.findByIdAndUpdate(
        { _id: id },
        { isDeleted: 1 },
        { new: true }
      );

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Error deleting user");
    }
  }
  async getUser(id: string): Promise<IUser | null> {
    try {
      return await User.findOne({ _id: id });
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }
  async updateUserData(data: Partial<IUser>): Promise<boolean> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: data.id },
        {
          name: data.userName,
          email: data.email,
          phone: data.phone,
        },
        { new: true }
      );

      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }
  async checkUser(email: string, id: string): Promise<IUser | null> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);

      return await User.findOne({
        _id: { $ne: objectId },
        email: email,
      });
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }
}

export default AdminService;
