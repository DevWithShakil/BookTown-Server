/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';
import validator from 'validator';

const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    publicationDate: {
      type: String,
      required: [true, 'Please provide a publicationDate'],
    },
    genre: {
      type: String,
      required: [true, 'Please provide a genre'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a author Id'],
    },
    review: [
      {
        userId: String,
        review: String,
        rating: [],
      },
    ],
    imageURL: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid url'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = model<IBook, BookModel>('book', BookSchema);

export default Book;
