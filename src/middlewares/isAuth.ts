import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({ error: "Token not informed" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    return req.user;
  });

  return next();
};

export default isAuth;
