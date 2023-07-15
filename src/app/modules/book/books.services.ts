import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { generateBookId } from '../../../helpers/generateId';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { formatDate } from '../../../helpers/timeDateFormater';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './books.constant';
import { IBook, IReview, IbookFilters } from './books.interface';
import { Book } from './books.model';

const createBook = async (payload: IBook): Promise<IBook> => {
  const BookId = await generateBookId();
  const BookPayload: IBook = { ...payload, id: BookId };
  const result = await Book.create(BookPayload);
  return result;
};

const getAllBooks = async (
  filters: IbookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    bookSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleBook = async (id: string) => {
  const result = await Book.find({ id: id });
  return result;
};

const deleteBook = async (id: string) => {
  const result = await Book.findOneAndDelete({ id: id });

  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const addBookReview = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const today = new Date();
  const options = {
    $push: {
      review: {
        title: payload.title,
        writtenBy: payload.writtenBy,
        date: formatDate(today),
      },
    },
  };
  const result = await Book.findOneAndUpdate({ id: id }, options, {
    new: true,
  });
  return result;
};

export const BookService = {
  createBook,
  addBookReview,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
};
