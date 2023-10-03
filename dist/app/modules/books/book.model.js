"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    publicationDate: {
        type: String,
        required: [true, 'Please provide a publicationDate'],
    },
    genre: {
        type: String,
        required: [true, 'Please provide a genre'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a author Id'],
    },
    review: [
        {
            userId: String,
            review: String,
            rating: [],
        },
    ],
    imageURL: {
        type: String,
        validate: [validator_1.default.isURL, 'Please provide a valid url'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Book = (0, mongoose_1.model)('book', BookSchema);
exports.default = Book;
