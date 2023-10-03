"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/create', book_controller_1.bookController.createBook);
router.patch('/:id', book_controller_1.bookController.updateBookById);
router.post('/review/:id', book_controller_1.bookController.addReview);
router.get('/', book_controller_1.bookController.getBook);
router.delete('/:id', book_controller_1.bookController.deleteBookById);
exports.BookRoutes = router;
