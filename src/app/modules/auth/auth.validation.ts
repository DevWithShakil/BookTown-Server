import { z } from 'zod';

const ICardSchema = z.object({
  cardNum: z.string(),
  cardName: z.string(),
});

const IPlanSchema = z.object({
  date: z.string(),
  id: z.string(),
});

const signUpZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
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
    email: z.string().email(),
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

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  signUpZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
