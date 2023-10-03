import { z } from 'zod';

const ICardSchema = z.object({
  cardNum: z.string(),
  cardName: z.string(),
});

const IPlanSchema = z.object({
  planId: z.string().optional(),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),
    role: z.enum(['user', 'admin', 'subAdmin']).optional(),
    status: z.enum(['active', 'inactive', 'block']).optional(),
    balance: z.number().optional(),
    gender: z.enum(['male', 'female']).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    ipAddress: z.string().optional(),
    address: z.string().optional(),
    imageURL: z.string().url().optional(),
    referCode: z.string().optional(),
    myReferralCode: z.string().optional(),
    card: z.array(ICardSchema).optional(),
    plan: z.array(IPlanSchema).optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
