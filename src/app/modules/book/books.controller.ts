import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './books.constant';
import { IBook } from './books.interface';
import { BookService } from './books.services';

const sendBookResponse = (res: Response, message: string, data: any) => {
  sendReponse<IBook>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);
  sendBookResponse(res, 'book is Created Successfully!', result);
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);
  sendBookResponse(res, 'books retrieved successfully !', result);
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendBookResponse(res, ' book Deleted successfully !', result);
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  sendBookResponse(res, 'Single book retrieved successfully !', result);
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await BookService.updateBook(id, UpdateData);
  sendBookResponse(res, 'book Data Is Updated successfully!', result);
});
const addBookReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await BookService.addBookReview(id, UpdateData);
  sendBookResponse(res, 'Review Is Added successfully!', result);
});

export const bookController = {
  createBook,
  getAllBook,
  getSingleBook,
  deleteBook,
  addBookReview,
  updateBook,
};
