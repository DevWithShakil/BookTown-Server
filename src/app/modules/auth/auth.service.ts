/* eslint-disable no-undef */

import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginStudent = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const user = await User.isUserExist(email);

  const userDetails = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  let isPasswordMatched = false;
  if (user) {
    isPasswordMatched = await User.isPasswordMatched(password, user.password);
  }
  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
  }

  // Generate an access token
  const accessToken = jwtHelpers.createToken(
    { email, userDetails },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { email, userDetails },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // Return the response object
  return {
    email,
    userDetails,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { email } = verifiedToken;

  // Check if the user is an Admin, Instructor, or Student
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.isUserExist(user?.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  // Checking OLD password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
  }
  // Hash password
  const newHashPass = await bcrypt.hash(
    newPassword,
    Number(config.default_salt_rounds as string)
  );
  const updatedData = {
    password: newHashPass,
  };
  const query = { email: user?.email };
  await User.findOneAndUpdate(query, updatedData);
};

export const AuthService = {
  loginStudent,
  refreshToken,
  changePassword,
};
