import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  console.log("authenticate token");
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      req.user = user;
      next();
    } else {
      res
        .status(400)
        .json({ message: "Authorization header missing or malformed" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token", error: err });
  }
};
