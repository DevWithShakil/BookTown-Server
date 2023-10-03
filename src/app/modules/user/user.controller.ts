import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { UpdateWriteOpResult } from 'mongoose';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../share/catchAsync';
import pick from '../../../share/pick';
import sendResponse from '../../../share/sendResponse';
import { userFilterableFields } from './user.constant';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const singleUpdate: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const result = await UserService.singleUpdateById(id, userData);

    sendResponse<IUser | UpdateWriteOpResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user retrieved successfully!',
      data: result,
    });
  }
);

const deleteUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.deleteUserById(id);

    sendResponse<IUser | UpdateWriteOpResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user delete successfully!',
      data: result,
    });
  }
);

export const UserController = {
  getAllUser,
  singleUpdate,
  deleteUserById,
};
