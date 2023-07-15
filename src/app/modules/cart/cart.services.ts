import { ICart } from './cart.interface';
import { Cart } from './cart.model';

const createCart = async (payload: ICart): Promise<ICart> => {
  const CartPayload: ICart = { ...payload };
  const result = await Cart.create(CartPayload);
  return result;
};

const getAllCarts = async (email: string) => {
  console.log('Hello+++++++++++', email);
  const result = await Cart.find({ email: email }).populate('course');
  return result;
};

const getSingleCart = async (id: string) => {
  const result = await Cart.findById(id).populate('course');

  return result;
};

const deleteCart = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);
  return result;
};

const updateCart = async (
  id: string,
  payload: Partial<ICart>
): Promise<ICart | null> => {
  const result = await Cart.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const CartService = {
  createCart,
  deleteCart,
  getAllCarts,
  getSingleCart,
  updateCart,
};
