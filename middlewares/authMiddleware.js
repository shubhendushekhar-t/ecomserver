import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
  const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.isAdmin !== true) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };