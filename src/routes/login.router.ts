import { login } from './../controllers/login.controller';
import { Router } from "express";
import validation from '../middlewares/validation';
import loginSchema from '../schemas/loginSchema';

const router = Router();

const loginRouter = () => {
  router.post('', validation(loginSchema), login);
  return router;
};

export default loginRouter;
