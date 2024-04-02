"use strict";
// searchMiddleware.ts
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
exports.logSearchHistory = void 0;
const searchHistoryModel_1 = __importDefault(require("../models/searchHistoryModel"));
const logSearchHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId;
        if (req.user && req.user.id) { // Adjust the type casting
            userId = req.user.id;
        }
        else {
            throw new Error('User ID not found in request');
        }
        // Extract search data from the request body
        const { prompt, response } = req.body;
        // Create a new search history entry with the user ID
        const searchHistory = new searchHistoryModel_1.default({ userId, prompt, response });
        yield searchHistory.save();
        next(); // Proceed to the next middleware
    }
    catch (error) {
        console.error('Error logging search history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.logSearchHistory = logSearchHistory;
// // // searchMiddleware.ts
// // import { Request, Response, NextFunction } from 'express';
// // import SearchHistoryModel from '../models/searchHistoryModel';
// // export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         // Extract user ID from authentication middleware
// //         const userId = req.user.id; // Assuming you have middleware to set req.user.id after authentication
// //         const { query, results } = req.body; // Assuming the AI model response is in the request body
// //         // Create a new search history entry
// //         const searchHistory = new SearchHistoryModel({ userId, query, results });
// //         await searchHistory.save();
// //         next(); // Proceed to the next middleware
// //     } catch (error) {
// //         console.error('Error logging search history:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };
// // searchMiddleware.ts
// // searchMiddleware.ts
// // searchMiddleware.ts
// import { Request, Response, NextFunction } from 'express';
// import SearchHistoryModel from '../models/searchHistoryModel';
// export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // Check if user object exists in the request
//         if (!req.user || !req.user.id) {
//             throw new Error('User ID not found in request');
//         }
//         // Extract user ID from the request
//         const userId = req.user.id;
//         // Extract search data from the request body
//         const { prompt, response } = req.body;
//         // Create a new search history entry
//         const searchHistory = new SearchHistoryModel({ userId, prompt, response });
//         await searchHistory.save();
//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error('Error logging search history:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// // import { Request, Response, NextFunction } from 'express';
// // import SearchHistoryModel, { SearchHistory } from '../models/searchHistoryModel';
// // export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         // Extract user ID from authentication middleware
// //         const userId = req.user ? req.user.id : 'unknown'; // Assuming you have middleware to set req.user.id after authentication
// //         const { query, results } = req.body; // Assuming the AI model response is in the request body
// //         // Create a new search history entry if user is authenticated
// //         if (userId !== 'unknown') {
// //             const searchHistory: SearchHistory = new SearchHistoryModel({ userId, query, results });
// //             await searchHistory.save();
// //         }
// //         next(); // Proceed to the next middleware
// //     } catch (error) {
// //         console.error('Error logging search history:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };
