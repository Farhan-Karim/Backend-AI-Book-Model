"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Correct import path
const router = express_1.default.Router();
// Protect routes with authentication middleware
router.use(authMiddleware_1.authenticateUser); // Use the correct middleware function here
router.get('/profile', userController_1.getUserProfile);
router.put('/profile', userController_1.updateUserProfile);
exports.default = router;
