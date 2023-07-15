/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { generateUserId } from '../../../helpers/generateId';
import { IUser } from './user.interface';
import { User } from './user.model';

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const createUser = async (payload: IUser) => {
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }
  const UserId = await generateUserId();

  const existingUser = await User.findOne({ email: payload?.email });

  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'User is already exist! Please login '
    );
  }

  const UserPayload: IUser = { ...payload, id: UserId };

  const createdUser = await User.create(UserPayload);
  const { password, ...result } = createdUser.toObject();
  return result;
};

export const UserService = {
  createUser,
  getSingleUser,
  updateUser,
};
