import express from 'express';
import { bookController } from './book.controller';
const router = express.Router();

router.post('/create', bookController.createBook);
router.patch('/:id', bookController.updateBookById);
router.post('/review/:id', bookController.addReview);
router.get('/', bookController.getBook);
router.delete('/:id', bookController.deleteBookById);

export const BookRoutes = router;
