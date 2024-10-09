import { IUser } from "../Models/userModel";
import { IAdmin } from "../Models/adminModel";

export interface IAdminService {
  checkAdmin(email: string): Promise<IAdmin | null>;
  verifyPassword(
    enteredPassword: string,
    storedPassword: string
  ): Promise<boolean>;
  getAllUsers(): Promise<any[]>;
  createUser(userData: IUser): Promise<IUser | null>;
  deleteStudent(id: string): Promise<boolean>;
  getUser(id: string): Promise<IUser | null>;
  updateUserData(data: Partial<IUser>): Promise<boolean>;
  checkUser(email: string, id: string): Promise<IUser | null>;
}
