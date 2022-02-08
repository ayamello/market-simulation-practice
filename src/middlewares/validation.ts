import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const validation =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      const validatedData = await schema.validate(data, { stripUnknown: true });
      req.validatedData = validatedData;
      next();
    } catch (e: any) {
      return res.status(400).json({ [e.name]: e.errors });
    }
    return data;
  };

export default validation;
