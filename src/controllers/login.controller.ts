import { Request, Response } from "express";
import { loginUser } from "../services/login.service";

export const login = async (req: Request, res: Response) => {
  const data = req.validatedData;
  try {
    const token = await loginUser(data);

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
