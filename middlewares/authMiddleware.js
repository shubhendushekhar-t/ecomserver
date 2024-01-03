import jwt from "jsonwebtoken";

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