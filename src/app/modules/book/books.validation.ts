import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required ',
    }),
    genre: z.string({
      required_error: 'Genre is required ',
    }),
    bookDescription: z
      .string({
        required_error: 'Book-Description is required ',
      })
      .optional(),
    author: z.string({
      required_error: 'Author is required ',
    }),

  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    bookDescription: z.string({}).optional(),
    author: z.string({}).optional(),
    genre: z.string({}).optional(),
    year: z.string({}).optional(),
    publicationDate: z.string({}).optional(),
    price: z.number({}).optional(),
    bookImage: z.string({}).optional(),
    rating: z.number({}).optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
