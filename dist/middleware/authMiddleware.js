"use strict";
// authMiddleware.ts
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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Import your User model
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Extract the JWT token from the request headers or cookies
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }
    try {
        // Verify the token and extract user ID
        const decodedToken = jsonwebtoken_1.default.verify(token, 'your-secret-key');
        // Find the user in the database using the decoded user ID
        const user = yield User_1.default.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Set the user ID in the request object
        req.user = { id: decodedToken.userId };
        next(); // Proceed to the next middleware
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
});
exports.authenticateUser = authenticateUser;
