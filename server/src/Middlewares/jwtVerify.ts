import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from the Authorization header
    let isValid = true;
    if (!token) {
      throw new Error();
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET || "asd568f99a9afasf67a65sf65",
      (err, decoded) => {
        if (err) {
          // Invalid token
          isValid = false;
          res.status(401).json({
            message: "Unauthorized! Token is invalid.",
            status: false,
          });
        }
        if (isValid) {
          next();
        }
      }
    );
  } catch (error) {
    res.status(401).json({ message: "Please authenticate", status: false });
  }
};

export default verifyToken;
