import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookController } from './books.controller';
import { BookValidation } from './books.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  bookController.createBook
);
router.get('/:id', bookController.getSingleBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), bookController.deleteBook);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),

  bookController.updateBook
);
router.post(
  '/review/:id',
  bookController.addBookReview
);

router.get('/', bookController.getAllBook);

export const BookRoutes = router;
