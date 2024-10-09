import express, { Router } from "express";
import AdminController from "../Contollers/adminController";
import AdminService from "../Services/adminService";

const adminRoute: Router = express.Router();

const adminService = new AdminService();
const adminController = new AdminController(adminService);

adminRoute.get("/dashboard", adminController.dashboard.bind(adminController));

adminRoute.post("/sign-in", adminController.signIn.bind(adminController));

adminRoute.post("/add-user", adminController.addUser.bind(adminController));

adminRoute.get(
  "/delete-user/:id",
  adminController.deleteUser.bind(adminController)
);

adminRoute.get(
  "/edit-user/:id",
  adminController.editUserLoad.bind(adminController)
);

adminRoute.post(
  "/update-user",
  adminController.updateUser.bind(adminController)
);

export default adminRoute;
