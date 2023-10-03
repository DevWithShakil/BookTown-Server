import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import verifyToken from '../../middlewares/verifyToken';
import { AuthController } from './auth.controller';
// import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/signUp',
  // validateRequest(AuthValidation.signUpZodSchema),
  AuthController.signUp
);

router.post(
  '/login',
  // validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.get('/me', verifyToken, AuthController.getMe);

router.patch('/changePass/:id', AuthController.ChangePss);

export const AuthRoutes = router;
