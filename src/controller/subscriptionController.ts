// subscriptionController.ts

import { Request, Response } from 'express';
import SubscriptionModel, { Subscription } from '../models/Subscription';

export const subscribe = async (req: Request, res: Response) => {
    try {
        const { userId, plan, startDate, endDate } = req.body;

        // Create a new subscription instance using the Mongoose model
        const subscription: Subscription = new SubscriptionModel({ 
            userId,
            plan,
            startDate,
            endDate
        });

        // Save the subscription to the database
        await subscription.save();

        res.status(201).json({ message: 'Subscription created successfully', subscription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const unsubscribe = async (req: Request, res: Response) => {
    try {
        const subscriptionId = req.params.id;

        // Find the subscription by ID and delete it
        const deletedSubscription = await SubscriptionModel.findByIdAndDelete(subscriptionId);

        if (deletedSubscription) {
            res.status(200).json({ message: 'Subscription canceled successfully' });
        } else {
            res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSubscriptionStatus = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        // Find subscriptions by user ID
        const userSubscriptions = await SubscriptionModel.find({ userId });

        if (userSubscriptions.length > 0) {
            res.status(200).json({ subscriptions: userSubscriptions });
        } else {
            res.status(404).json({ message: 'No subscriptions found for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


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
