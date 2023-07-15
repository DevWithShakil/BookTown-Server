import { Schema, model } from 'mongoose';
import { ApiError } from '../../../handlingError/ApiError';
import { CartModel, ICart } from './cart.interface';

const cartSchema = new Schema<ICart>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre('save', async function (next) {
  const existingStudent = await Cart.findOne({
    email: this.email,
    course: this.course,
  });
  if (existingStudent) {
    throw new ApiError(409, 'This Course is already Added to Cart');
  }
  next();
});

export const Cart = model<ICart, CartModel>('cart', cartSchema);
