"use strict";
// subscriptionController.ts
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
exports.getSubscriptionStatus = exports.unsubscribe = exports.subscribe = void 0;
const Subscription_1 = __importDefault(require("../models/Subscription"));
// Enum defining subscription plans
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE_TRIAL"] = "free_trial";
    SubscriptionPlan["MONTHLY_PAID"] = "monthly_paid";
})(SubscriptionPlan || (SubscriptionPlan = {}));
const subscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, plan } = req.body;
        // Define subscription start and end dates
        const startDate = new Date();
        let endDate;
        // Determine subscription end date based on the plan
        if (plan === SubscriptionPlan.FREE_TRIAL) {
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 3); // Free trial lasts for 3 days
        }
        else if (plan === SubscriptionPlan.MONTHLY_PAID) {
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1); // Monthly subscription lasts for 1 month
        }
        else {
            return res.status(400).json({ message: 'Invalid subscription plan' });
        }
        // Create a new subscription instance using the Mongoose model
        const subscription = new Subscription_1.default({
            userId,
            plan,
            startDate,
            endDate
        });
        // Save the subscription to the database
        yield subscription.save();
        res.status(201).json({ message: 'Subscription created successfully', subscription });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.subscribe = subscribe;
const unsubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptionId = req.params.id;
        // Find the subscription by ID and delete it
        const deletedSubscription = yield Subscription_1.default.findByIdAndDelete(subscriptionId);
        if (deletedSubscription) {
            res.status(200).json({ message: 'Subscription canceled successfully' });
        }
        else {
            res.status(404).json({ message: 'Subscription not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.unsubscribe = unsubscribe;
const getSubscriptionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Find subscriptions by user ID
        const userSubscriptions = yield Subscription_1.default.find({ userId });
        if (userSubscriptions.length > 0) {
            res.status(200).json({ subscriptions: userSubscriptions });
        }
        else {
            res.status(404).json({ message: 'No subscriptions found for this user' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getSubscriptionStatus = getSubscriptionStatus;
// // subscriptionController.ts
// import { Request, Response } from 'express';
// import SubscriptionModel, { Subscription } from '../models/Subscription';
// export const subscribe = async (req: Request, res: Response) => {
//     try {
//         const { userId, plan, startDate, endDate } = req.body;
//         // Create a new subscription instance using the Mongoose model
//         const subscription: Subscription = new SubscriptionModel({ 
//             userId,
//             plan,
//             startDate,
//             endDate
//         });
//         // Save the subscription to the database
//         await subscription.save();
//         res.status(201).json({ message: 'Subscription created successfully', subscription });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// export const unsubscribe = async (req: Request, res: Response) => {
//     try {
//         const subscriptionId = req.params.id;
//         // Find the subscription by ID and delete it
//         const deletedSubscription = await SubscriptionModel.findByIdAndDelete(subscriptionId);
//         if (deletedSubscription) {
//             res.status(200).json({ message: 'Subscription canceled successfully' });
//         } else {
//             res.status(404).json({ message: 'Subscription not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// export const getSubscriptionStatus = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.userId;
//         // Find subscriptions by user ID
//         const userSubscriptions = await SubscriptionModel.find({ userId });
//         if (userSubscriptions.length > 0) {
//             res.status(200).json({ subscriptions: userSubscriptions });
//         } else {
//             res.status(404).json({ message: 'No subscriptions found for this user' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// // subscriptionController.ts
// import { Request, Response } from 'express';
// import { Subscription, subscriptions } from '../models/Subscription'; // Adjust the path as needed
// export const subscribe = async (req: Request, res: Response) => {
//     try {
//         const { userId, plan, startDate, endDate } = req.body;
//         const subscription = {
//             id: Date.now().toString(),
//             userId,
//             plan,
//             startDate: new Date(startDate),
//             endDate: new Date(endDate)
//         } as Subscription; // Explicitly cast the object to Subscription type
//         subscriptions.push(subscription);
//         res.status(201).json({ message: 'Subscription created successfully', subscription });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// export const unsubscribe = async (req: Request, res: Response) => {
//     try {
//         const subscriptionId = req.params.id;
//         // Find the index of the subscription with the given ID
//         const index = subscriptions.findIndex(sub => sub.id === subscriptionId);
//         if (index !== -1) {
//             // Remove the subscription from the array
//             subscriptions.splice(index, 1);
//             res.status(200).json({ message: 'Subscription canceled successfully' });
//         } else {
//             res.status(404).json({ message: 'Subscription not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// export const getSubscriptionStatus = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.userId;
//         // Filter subscriptions by user ID
//         const userSubscriptions = subscriptions.filter(sub => sub.userId === userId);
//         if (userSubscriptions.length > 0) {
//             res.status(200).json({ subscriptions: userSubscriptions });
//         } else {
//             res.status(404).json({ message: 'No subscriptions found for this user' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
