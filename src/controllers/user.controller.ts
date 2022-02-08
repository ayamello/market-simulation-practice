import { Request, Response } from "express";
import { createUser, listUsers, getDataUser } from "../services/user.service";

export const create = async (req: Request, res: Response) => {
  const data = req.validatedData;

  try {
    const user = await createUser(data);

    const output = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdm: user.isAdm,
      createdOn: user.createdOn,
      updatedOn: user.updatedOn,
    };

    return res.status(201).json(output);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  const users = await listUsers();

  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { user } = req.user;
  const { id } = req.params;
  try {
    const userFind = await getDataUser(id, user);
  
    res.status(200).json(userFind);
  } catch(error: any) {
    return res.status(400).json({ message: error.message });
  }
  
};
