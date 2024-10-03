import { IUser } from "../Models/userModel";

export interface IUserService {
  createUser(studentData: IUser): Promise<IUser | null>;
  checkUser(email: string): Promise<IUser|null>;
  verifyPassword(storedPassword :string,enteredPassword: string): Promise<boolean>;
}