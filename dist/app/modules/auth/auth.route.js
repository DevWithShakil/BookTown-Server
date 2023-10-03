"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateRequest';
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const auth_controller_1 = require("./auth.controller");
// import { AuthValidation } from './auth.validation';
const router = express_1.default.Router();
router.post('/signUp', 
// validateRequest(AuthValidation.signUpZodSchema),
auth_controller_1.AuthController.signUp);
router.post('/login', 
// validateRequest(AuthValidation.loginZodSchema),
auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', 
// validateRequest(AuthValidation.refreshTokenZodSchema),
auth_controller_1.AuthController.refreshToken);
router.get('/me', verifyToken_1.default, auth_controller_1.AuthController.getMe);
router.patch('/changePass/:id', auth_controller_1.AuthController.ChangePss);
exports.AuthRoutes = router;
