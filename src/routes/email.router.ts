import { Router } from "express";
import { sendEmail } from './../controllers/sendEmail.controller';
import validation from '../middlewares/validation';
import emailSchema from "../schemas/emailSchema"
import isAuth from "../middlewares/isAuth";
import isUserAdm from "../middlewares/isUserAdm";

const router = Router();

const EmailRouter = () => {
  router.post('', isAuth, isUserAdm, validation(emailSchema), sendEmail);
  return router;
};

export default EmailRouter;