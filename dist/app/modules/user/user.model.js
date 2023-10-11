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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        validate: [
            validator_1.default.isMobilePhone,
            'Please provide a valid contact number',
        ],
    },
    email: {
        type: String,
        validate: [validator_1.default.isEmail, 'Provide a valid Email'],
        lowercase: true,
        unique: true,
        sparse: true,
        required: [true, 'Email is required'],
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: false,
            },
        },
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'subAdmin'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'block'],
        default: 'active',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password is not strong enough.'],
        select: 0,
    },
    address: {
        type: String,
        minLength: [3, 'Name must be at least 3 characters.'],
        maxLength: [100, 'Name is too large'],
    },
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
UserSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ phoneNumber: id }, { password: 1, role: 1, phoneNumber: 1, status: 1, _id: 1 });
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// User.create() / user.save()
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing user password
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
