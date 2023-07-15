import { Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';

export type ICart = {
  course: Types.ObjectId | ICourse;
  email: string;
};

export type CartModel = Model<ICart>;
