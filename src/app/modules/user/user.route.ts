import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidaion } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidaion.createUserZodSchema),
  UserController.createUser
);
router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(UserValidaion.updateUserZodSchema),
  UserController.updateUser
);

export const UserRoutes = router;
