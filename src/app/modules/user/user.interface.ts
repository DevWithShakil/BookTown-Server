/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IUser = {
  save(): unknown;
  name: UserName;
  role: 'user' | 'admin' | 'subAdmin';
  status: 'active' | 'inactive' | 'block';
  password: string;
  gender?: 'male' | 'female';
  email: string;
  phoneNumber?: string;
  address?: string;
  imageURL?: string;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'password' | 'role' | 'email' | 'status'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  phoneNumber?: string;
};
