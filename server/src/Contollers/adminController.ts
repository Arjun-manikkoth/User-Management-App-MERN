import { Request, Response } from "express";
import { IAdminService } from "../Interfaces/IAdminService";
import jwt from "jsonwebtoken";

class AdminController {
  private adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      let admin = await this.adminService.checkAdmin(req.body.email);

      if (!admin) {
        res.status(404).json({ message: "admin not found" });
        return;
      } else {
        const isPasswordValid = await this.adminService.verifyPassword(
          req.body.password,
          admin.password
        );

        if (!isPasswordValid) {
          res.status(400).json({ message: "Invalid Username/Password" });
          return;
        } else {
          //generate jwt token
          const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            "asd568f99a9afasf67a65sf65",
            { expiresIn: "1h" }
          );

          // Send token to frontend
          res.status(200).json({ token, admin });
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async dashboard(req: Request, res: Response): Promise<void> {
    try {
      const usersData = await this.adminService.getAllUsers();

      res.status(200).json({ usersData: usersData });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.adminService.createUser(req.body);

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
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const result = await this.adminService.deleteStudent(id);

      if (result) {
        res.status(200).json({
          message: "user deleted successfully",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "user not found",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }

  async editUserLoad(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const result = await this.adminService.getUser(id);

      if (result) {
        res.status(200).json({
          message: "user data fetched successfully",
          success: true,
          data: result,
        });
      } else {
        res.status(404).json({
          message: "user not found",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      let user = await this.adminService.checkUser(req.body.email, req.body.id);

      if (!user) {
        const result = await this.adminService.updateUserData(req.body);

        if (result) {
          res.status(200).json({
            message: "user updated successfully",
            success: true,
          });
        } else {
          res.status(404).json({
            message: "user not updated",
            success: false,
          });
        }
      } else {
        res.status(400).json({
          message: "Email Already Exists",
          success: false,
          email: true,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }
}
export default AdminController;
