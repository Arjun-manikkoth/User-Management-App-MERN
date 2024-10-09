import { IUserService } from "../Interfaces/IUserService";
import User, { IUser } from "../Models/userModel";
import bcrypt from "bcrypt";

class UserService implements IUserService {
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

  async checkUser(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email: email });
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }

  async verifyPassword(
    storedPassword: string,
    enteredPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(enteredPassword, storedPassword);
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }
}
export default UserService;
