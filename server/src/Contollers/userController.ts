import { Request, Response } from "express";
import { IUserService } from "../Interfaces/IUserService";
import jwt from "jsonwebtoken";

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.userService.createUser(req.body);

      if (!newUser) {
        res.status(400).json({ message: "Email Already Exists" });
      } else {
        res
          .status(201)
          .json({ message: "User Created Sucessfully", user: newUser });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      let user = await this.userService.checkUser(req.body.email);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      } else {
        const isPasswordValid = await this.userService.verifyPassword(
          user.password,
          req.body.password
        );

        if (!isPasswordValid) {
          res.status(400).json({ message: "Invalid password" });
          return;
        } else {
          //generate jwt token
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "adfksafadfafsdad",
            { expiresIn: "1h" }
          );

          // Send token to frontend
          res.status(200).json({ token, user });
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async imageUpload(req: Request, res: Response): Promise<void> {
    try {
      const status = await this.userService.storeUrl(
        req.body.user_id,
        req.body.url
      );

      if (status) {
        res.status(200).json({ status: true });
      } else {
        res.status(400).json({ status: false });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
export default UserController;
