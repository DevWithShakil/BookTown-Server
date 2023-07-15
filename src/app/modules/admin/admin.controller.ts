/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';


const sendAdminResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const  {...admin}  = req.body;
    const result = await AdminService.createAdmin(admin);
    sendAdminResponse(res, 'Admin created successfully!', result);
  }
);
//Get all Admins
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmins();
  sendAdminResponse(res, ' All Admin Admins fetched successfully', result);
});
//Get a Single Admin
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);
  sendAdminResponse(res, 'Single Admin is found', result);
});
//Update Admin
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.updateAdmin(id, req.body);
  await sendAdminResponse(res, `Admin is Updated successfully`, result);
});
//Delete a Single Admin
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdmin(id);
  await sendAdminResponse(res, `Admin is Deleted successfully`, result);
});



export const AdminController = {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,

};
