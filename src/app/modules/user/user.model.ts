/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
};

//password Matching

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing user password
UserSchema.pre('save', async function (next) {
  const User = this;
  User.password = await bcrypt.hash(
    User.password,
    Number(config.default_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
