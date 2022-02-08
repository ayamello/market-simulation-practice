import { Request, Response, NextFunction } from "express";

const isUserAdm = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.user;

  if (user.isAdm === false) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  return next();
};

export default isUserAdm;
