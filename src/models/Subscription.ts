// src/models/Subscription.ts

import mongoose, { Document } from 'mongoose';

export interface Subscription extends Document {
    userId: string;
    plan: string;
    startDate: Date;
    endDate: Date;
}

const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});
export const subscriptions: Subscription[] = [];
const SubscriptionModel = mongoose.model<Subscription>('Subscription', subscriptionSchema);
export default SubscriptionModel;

