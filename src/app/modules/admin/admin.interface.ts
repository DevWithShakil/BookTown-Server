/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  role: string;
  email: string;
  password: string;
  name: UserName;
  phoneNumber: string;
  address: string;
  profileImage?: string;
};



export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  name?: string;
};




export type AdminModel = {
  isAdminExist(email: string): Promise<Pick<IAdmin, 'email' | 'password' | 'role'>>;
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IAdmin>
