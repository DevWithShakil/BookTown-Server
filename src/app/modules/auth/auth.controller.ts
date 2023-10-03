import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import { IUser } from '../user/user.interface';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    console.log(userData);
    const result = await AuthService.signUp(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully !',
    data: result,
  });
});

const getMe: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.getMe(req.user?.phoneNumber);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user get successfully!',
      data: result,
    });
  }
);

const ChangePss: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { oldPass, newPass } = req.body;
    const { id } = req.params;
    const result = await AuthService.changePass(id, oldPass, newPass);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'password change successfully!',
      data: result,
    });
  }
);

export const AuthController = {
  signUp,
  loginUser,
  refreshToken,
  getMe,
  ChangePss,
};
