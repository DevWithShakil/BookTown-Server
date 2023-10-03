"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (TaskInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield book_model_1.default.create(TaskInfo);
    return request;
});
const getAllBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield book_model_1.default.find({}).populate('author');
    return request;
});
const updateBook = (Id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, 'nai keno');
    const result = yield book_model_1.default.updateOne({ _id: Id }, { $set: data }, { new: true, upsert: true });
    return result;
});
const addReview = (Id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const result = yield book_model_1.default.updateOne({ _id: Id }, {
        $push: {
            review: data,
        },
    }, { new: true, upsert: true });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.deleteOne({ _id: id });
    return result;
});
exports.BookService = {
    createBook,
    getAllBook,
    updateBook,
    deleteBook,
    addReview,
};
