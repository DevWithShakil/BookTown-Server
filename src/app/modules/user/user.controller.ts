import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { default as sendReponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const sendUserResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...User } = req.body;
  const result = await UserService.createUser(User);
  sendUserResponse(res, 'User is created successfully', result);
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendUserResponse(res, ' Single User retrieved successfully !', result);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendUserResponse(res, 'User updated successfully !', result);
});

export const UserController = {
  createUser,
  getSingleUser,
  updateUser,
};
