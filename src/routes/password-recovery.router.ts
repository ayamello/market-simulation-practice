import { passwordRecovery, resetPassword } from "./../controllers/user.controller";
import { Router } from "express";

const router = Router();

const passwordRecoveryRouter = () => {
  router.post("/password-recovery", passwordRecovery);
  router.post("/reset-password", resetPassword);
  return router;
};

export default passwordRecoveryRouter;
