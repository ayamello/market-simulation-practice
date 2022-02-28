import { Request, Response } from "express";
import { createUser, listUsers, getDataUser, passwordRecoveryService, resetPasswordService } from "../services/user.service";
import { transport, mailOptions } from './../services/email.service';

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

export const passwordRecovery = async (req: Request, res: Response) => {
  const { email } = req.body; 
  
  const user = await passwordRecoveryService(email);

  const emailFrom = process.env.EMAIL_SYSTEM;

  if(user && emailFrom) {
    const options = mailOptions(
      emailFrom, 
      user?.email, 
      "Password recovery",
      `Your code is ${user?.token}`
    );

    transport.sendMail(options, function(err, info) {
      if(err) {
       return err;
      }
      else {
        console.log(info)
        return res.status(200).json({ "message": "Code sended!" });
      }
    });
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  const { email, password, token } = req.body;

  const status = await resetPasswordService(email, password, token);

  if(status.message === "Password changed!") {
    return res.status(200).json({ message: status.message });
  } 

  return res.status(403).json({ message: status.message });
}