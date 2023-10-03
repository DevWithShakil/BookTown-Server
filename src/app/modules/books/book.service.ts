import { UpdateWriteOpResult } from 'mongoose';
import { IBook, IReview } from './book.interface';
import Book from './book.model';

const createBook = async (TaskInfo: IBook): Promise<IBook> => {
  const request = await Book.create(TaskInfo);
  return request;
};

const getAllBook = async (): Promise<IBook[]> => {
  const request = await Book.find({}).populate('author');
  return request;
};

const updateBook = async (
  Id: string,
  data: any
): Promise<UpdateWriteOpResult> => {
  console.log(data, 'nai keno');
  const result = await Book.updateOne(
    { _id: Id },
    { $set: data },
    { new: true, upsert: true }
  );

  return result;
};

const addReview = async (
  Id: string,
  data: IReview
): Promise<UpdateWriteOpResult> => {
  console.log(data);
  const result = await Book.updateOne(
    { _id: Id },
    {
      $push: {
        review: data,
      },
    },
    { new: true, upsert: true }
  );

  return result;
};

const deleteBook = async (id: string): Promise<any> => {
  const result = await Book.deleteOne({ _id: id });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
  addReview,
};
