// searchHistoryModel.ts

import mongoose, { Document } from 'mongoose';

export interface SearchHistory extends Document {
    userId: string;
    prompt: string;
    response: string;
    timestamp: Date;
}

const searchHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const SearchHistoryModel = mongoose.model<SearchHistory>('SearchHistory', searchHistorySchema);
export default SearchHistoryModel;


