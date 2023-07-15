import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { ICart } from './cart.interface';
import { CartService } from './cart.services';

const sendCartResponse = (res: Response, message: string, data: any) => {
  sendReponse<ICart>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createCart = catchAsync(async (req: Request, res: Response) => {
  const { ...CartData } = req.body;
  const result = await CartService.createCart(CartData);
  sendCartResponse(res, 'Cart is Created Successfully!', result);
});

const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await CartService.getAllCarts(email);
  sendCartResponse(res, 'Carts  are retrieved successfully !', result);
});

const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CartService.deleteCart(id);
  sendCartResponse(res, ' Cart Deleted successfully !', result);
});
const getSingleCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CartService.getSingleCart(id);
  sendCartResponse(res, 'Single Cart retrieved successfully !', result);
});
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await CartService.updateCart(id, UpdateData);
  sendCartResponse(res, 'Cart Data Is Updated successfully!', result);
});

export const CartController = {
  createCart,
  getAllCarts,
  getSingleCart,
  deleteCart,
  updateCart,
};
