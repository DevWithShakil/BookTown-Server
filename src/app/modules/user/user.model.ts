/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid contact number',
      ],
    },

    email: {
      type: String,
      validate: [validator.isEmail, 'Provide a valid Email'],
      lowercase: true,
      unique: true,
      sparse: true,
      required: [true, 'Email is required'],
    },

    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'subAdmin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'block'],
      default: 'active',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password is not strong enough.'],
      select: 0,
    },
    address: {
      type: String,
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [100, 'Name is too large'],
    },

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

UserSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'password' | 'role' | 'phoneNumber' | 'status'> | null> {
  return await User.findOne(
    { phoneNumber: id },
    { password: 1, role: 1, phoneNumber: 1, status: 1, _id: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
