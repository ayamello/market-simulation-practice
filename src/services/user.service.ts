import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import UserRepository from "../repositories/UserRepository";
import { UserBodySignUp, DataUser } from "../types/IUser";
import { v4 } from "uuid";

export const createUser = async (data: UserBodySignUp) => {
  const userRepository = getCustomRepository(UserRepository);

  if ((await userRepository.emailAlreadyExists(data.email)) === true) {
    throw new Error("Email already registered");
  }

  try {
    const user = userRepository.create(data);

    await userRepository.save(user);

    return user;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};

export const listUsers = async () => {
  const userRepository = getCustomRepository(UserRepository);

  const users = await userRepository.getUsers();

  return users;
};

export const getDataUser = async (id: string, user: DataUser) => {
  const userRepository = getCustomRepository(UserRepository);

  try {
    if (user.isAdm !== true && user.id !== id) {
      return "Unauthorized";
    }

    const userFind = await userRepository.findUserbyId(id);

    return userFind;
  } catch (error) {
    throw new AppError((error as any).message, 404);
  }
};

export const passwordRecoveryService = async (email: string) => {
  const userRepository = getCustomRepository(UserRepository);

  try {
    const userFind = await userRepository.findUserByEmail(email);

    if(userFind) {
      userFind.token = v4();
      await userRepository.save(userFind);
    }

    return userFind;
  } catch (error) {
    throw new AppError((error as any).message, 404);
  } 
}

export const resetPasswordService = async (email: string, password: string, token: string) => {
  const userRepository = getCustomRepository(UserRepository);

  try {
    const userFind = await userRepository.findUserByEmail(email);

    if(userFind && userFind.token === token) {
      userFind.password = password;
      userFind.token = "";

      await userRepository.save(userFind);

      return {message: "Password changed!"};
    }

    return {message: "Invalid token"};
  } catch (error) {
    throw new AppError((error as any).message, 404);
  } 
}
