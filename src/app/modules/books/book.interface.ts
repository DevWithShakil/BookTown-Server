/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  userId: string;
  review: string;
  rating: string[];
};

export type IBook = {
  save(): unknown;
  title?: string;
  author: Types.ObjectId | IUser;
  publicationDate: string;
  genre: string;
  imageURL?: string;
  review: IReview[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
};
