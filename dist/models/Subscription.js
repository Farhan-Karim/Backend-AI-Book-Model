"use strict";
// // src/models/Subscription.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose, { Document } from 'mongoose';
// export interface Subscription extends Document {
//     userId: string;
//     plan: string;
//     startDate: Date;
//     endDate: Date;
// }
// const subscriptionSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     plan: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true }
// });
// export const subscriptions: Subscription[] = [];
// const SubscriptionModel = mongoose.model<Subscription>('Subscription', subscriptionSchema);
// export default SubscriptionModel;
// src/models/Subscription.ts
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Subscription model
const subscriptionSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});
// Create the Subscription model
const SubscriptionModel = mongoose_1.default.model('Subscription', subscriptionSchema);
exports.default = SubscriptionModel;
