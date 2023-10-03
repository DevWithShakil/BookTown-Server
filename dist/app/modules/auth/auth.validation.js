"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const ICardSchema = zod_1.z.object({
    cardNum: zod_1.z.string(),
    cardName: zod_1.z.string(),
});
const IPlanSchema = zod_1.z.object({
    date: zod_1.z.string(),
    id: zod_1.z.string(),
});
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        })
            .optional(),
        role: zod_1.z.enum(['user', 'admin', 'subAdmin']).optional(),
        status: zod_1.z.enum(['active', 'inactive', 'block']).optional(),
        balance: zod_1.z.number().optional(),
        gender: zod_1.z.enum(['male', 'female']).optional(),
        email: zod_1.z.string().email(),
        phoneNumber: zod_1.z.string().optional(),
        ipAddress: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        imageURL: zod_1.z.string().url().optional(),
        referCode: zod_1.z.string().optional(),
        myReferralCode: zod_1.z.string().optional(),
        card: zod_1.z.array(ICardSchema).optional(),
        plan: zod_1.z.array(IPlanSchema).optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'ID is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    signUpZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
