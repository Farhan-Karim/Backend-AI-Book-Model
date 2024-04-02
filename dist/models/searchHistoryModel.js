"use strict";
// searchHistoryModel.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const searchHistorySchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const SearchHistoryModel = mongoose_1.default.model('SearchHistory', searchHistorySchema);
exports.default = SearchHistoryModel;
