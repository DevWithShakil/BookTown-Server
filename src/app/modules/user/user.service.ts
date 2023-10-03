import httpStatus from 'http-status';
import { SortOrder, UpdateWriteOpResult } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';

const getAllUser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const singleUpdateById = async (
  Id: string,
  data: Partial<IUser>
): Promise<IUser | UpdateWriteOpResult> => {
  const me: IUser | null = await User.findOne({ _id: Id });
  if (!me) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not find');
  }

  const result = await User.updateOne(
    { _id: Id },
    { $set: data },
    { new: true, upsert: true }
  );

  return result;
};

const deleteUserById = async (id: string): Promise<any> => {
  const user: IUser | null = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not find');
  }
  const result = await User.deleteOne({ _id: id });
  return result;
};

export const UserService = {
  getAllUser,
  singleUpdateById,
  deleteUserById,
};
