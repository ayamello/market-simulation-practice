import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import jwtConfig from "../configs/jwt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import { UserLoginData } from "../types/IUser";

export const loginUser = async (data: UserLoginData) => {
  const userRepository = getCustomRepository(UserRepository);

  try {
    const user = await userRepository.findUserByEmail(data.email);

    if (!user) {
      throw new Error("User not found!");
    } else if (bcrypt.compareSync(data.password, user.password) === false) {
      throw new Error("Password missmatch!");
    }

    const token = jwt.sign({ user }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return token;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};
