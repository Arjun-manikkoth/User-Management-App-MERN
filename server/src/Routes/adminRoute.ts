import express, { Router } from "express";
import AdminController from "../Contollers/adminController";
import AdminService from "../Services/adminService";
import verifyToken from "../Middlewares/jwtVerify";

const adminRoute: Router = express.Router();

const adminService = new AdminService();
const adminController = new AdminController(adminService);

adminRoute.get(
  "/dashboard",
  verifyToken,
  adminController.dashboard.bind(adminController)
);

adminRoute.post("/sign-in", adminController.signIn.bind(adminController));

adminRoute.post(
  "/add-user",
  verifyToken,
  adminController.addUser.bind(adminController)
);

adminRoute.get(
  "/delete-user/:id",
  verifyToken,
  adminController.deleteUser.bind(adminController)
);

adminRoute.get(
  "/edit-user/:id",
  verifyToken,
  adminController.editUserLoad.bind(adminController)
);

adminRoute.post(
  "/update-user",
  verifyToken,
  adminController.updateUser.bind(adminController)
);

export default adminRoute;
