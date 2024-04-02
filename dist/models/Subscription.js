"use strict";
// src/models/Subscription.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subscriptionSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});
exports.subscriptions = [];
const SubscriptionModel = mongoose_1.default.model('Subscription', subscriptionSchema);
exports.default = SubscriptionModel;
