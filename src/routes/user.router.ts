import { create, list, getUserById } from './../controllers/user.controller';
import { Router } from "express";
import validation from "../middlewares/validation";
import userSchema from "../schemas/userSchema";
import isAuth from '../middlewares/isAuth';
import isUserAdm from '../middlewares/isUserAdm';

const router = Router();

const userRouter = () => {
  router.post('', validation(userSchema), create);
  router.get('', isAuth, isUserAdm, list);
  router.get('/:id', isAuth, getUserById);
  return router;
};

export default userRouter;
