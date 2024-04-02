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
exports.updateUserProfile = exports.getUserProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the user ID from the request
        const userId = req.user.id; // Assuming the user ID is set in the request object by authentication middleware
        // Find the user by ID in the database
        const user = yield User_1.default.findById(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return the user profile data
        res.status(200).json({ userProfile: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // Assuming the user ID is set in the request object by authentication middleware
    const { email, fullName, lawFirm, areaOfPractice } = req.body;
    try {
        // Find the user by ID
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update user fields if provided in the request body
        if (email)
            user.email = email;
        if (fullName)
            user.fullName = fullName;
        if (lawFirm)
            user.lawFirm = lawFirm;
        if (areaOfPractice)
            user.areaOfPractice = areaOfPractice;
        // Save the updated user profile
        yield user.save();
        // Return success response
        res.status(200).json({
            message: "Profile updated successfully",
            userProfile: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserProfile = updateUserProfile;
