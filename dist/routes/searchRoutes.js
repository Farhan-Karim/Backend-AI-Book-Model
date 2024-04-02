"use strict";
// searchRoutes.ts
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
const express_1 = __importDefault(require("express"));
const searchMiddleware_1 = require("../middleware/searchMiddleware");
const searchHistoryModel_1 = __importDefault(require("../models/searchHistoryModel"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// POST /api/search
router.post('/', authMiddleware_1.authenticateUser, searchMiddleware_1.logSearchHistory, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the search query from the request body
        const searchQuery = req.body.query;
        // Perform the search operation (For demonstration, we'll simply echo the search query)
        const searchResult = `Search results for query: ${searchQuery}`;
        // Send the search results as a response
        res.status(200).json({ message: 'Search successful', results: searchResult });
    }
    catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// GET /api/search/history
router.get('/history', authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // Cast req to any to access user property
        const searchHistory = yield searchHistoryModel_1.default.find({ userId });
        res.status(200).json({ searchHistory });
    }
    catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
// // searchRoutes.ts
// import express from "express";
// import { logSearchHistory } from "../middleware/searchMiddleware";
// import SearchHistoryModel from "../models/searchHistoryModel";
// import { stringify } from "querystring";
// const router = express.Router();
// // POST /api/search
// router.post("/sw", logSearchHistory, async (req, res) => {
//   // Your search logic here
//   res.status(200).json({ message: "Search successful" });
// });
// // GET /api/search/history
// router.get("/history", async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you have middleware to set req.user.id after authentication
//     const searchHistory = await SearchHistoryModel.find({ userId });
//     res.status(200).json({ searchHistory });
//   } catch (error) {
//     console.error("Error fetching search history:", error);
//     res.status(500).json({ message: "Internal server error", detail: JSON.stringify(error) });
//   }
// });
// export default router;
// // // searchRoutes.ts
// import express from 'express';
// import logSearchHistory from '../middleware/searchMiddleware';
// import { performAISearch } from '../controller/searchController';
// const router = express.Router();
// // Route for performing a search
// router.post('/', logSearchHistory, performAISearch);
// // Route for fetching search history
// router.get('/history', async (req, res) => {
//     try {
//         const userId = req.user ? req.user.id : 'unknown'; // Check if user is authenticated
//         if (userId === 'unknown') {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         // Fetch search history logic here
//         res.status(200).json({ message: 'Search history fetched successfully' });
//     } catch (error) {
//         console.error('Error fetching search history:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
// // export default router;
// // // src/routes/searchRoutes.ts
// // // searchRoutes.ts
// // import express from 'express';
// // import { logSearchHistory } from '../middleware/searchMiddleware';
// // import SearchHistoryModel from '../models/searchHistoryModel';
// // const router = express.Router();
// // // POST /api/search
// // router.post('/', logSearchHistory, async (req, res) => {
// //     // Your search logic here
// //     res.status(200).json({ message: 'Search successful' });
// // });
// // // GET /api/search/history
// // router.get('/history', async (req, res) => {
// //     try {
// //         const userId = req.user.id; // Assuming you have middleware to set req.user.id after authentication
// //         const searchHistory = await SearchHistoryModel.find({ userId });
// //         res.status(200).json({ searchHistory });
// //     } catch (error) {
// //         console.error('Error fetching search history:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // });
// // export default router;
