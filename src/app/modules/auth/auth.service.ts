import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const signUp = async (userData: IUser): Promise<IUser | null> => {
  const user = await User.create(userData);
  return user;
};

const getMe = async (phoneNumber: string): Promise<IUser | null> => {
  const me = await User.findOne({ phoneNumber });
  return me;
};

const changePass = async (
  id: string,
  oldPass: string,
  newPass: string
): Promise<any> => {
  const isUserExist = await User.isUserExist(id);

  console.log(id, isUserExist);

  if (!isUserExist) {
    throw new Error('User not found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    oldPass,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not correct');
  }

  const result = await User.updateOne(
    { phoneNumber: id },
    { $set: { password: newPass } },
    { new: true, upsert: true }
  );
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  if (isUserExist.status !== 'active') {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Your account is not active yet.'
    );
  }

  //create access token & refresh token

  const { role, email } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  const user = await User.findOne({ email });

  return {
    accessToken,
    refreshToken,
    user,
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
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  signUp,
  loginUser,
  refreshToken,
  getMe,
  changePass,
};
