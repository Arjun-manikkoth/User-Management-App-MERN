import express, { Router } from "express";
import UserController from "../Contollers/userController";
import UserService from "../Services/userService";
import verifyToken from "../Middlewares/jwtVerify";

const userRoute: Router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoute.post("/sign-up", userController.signUp.bind(userController));

userRoute.post("/sign-in", userController.signIn.bind(userController));

userRoute.post(
  "/image-upload",
  verifyToken,
  userController.imageUpload.bind(userController)
);

export default userRoute;
