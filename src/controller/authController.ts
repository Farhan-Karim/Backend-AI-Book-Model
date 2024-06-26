// authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/User';
import SubscriptionModel, { Subscription } from '../models/Subscription';

const JWT_SECRET = 'your_jwt_secret';

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, lawFirm, areaOfPractice } = req.body;

        // Check if user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser: UserDocument = new User({ fullName, email, password: hashedPassword, lawFirm, areaOfPractice });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        // Check the user's subscription status
        const subscription = await SubscriptionModel.findOne({ userId: user.id });

        // Prepare response data
        const responseData: { [key: string]: any } = { token, message: 'login successful' };

        if (subscription) {
            // User has an active subscription
            responseData.subscriptionStatus = 'active';
            responseData.subscriptionPlan = subscription.plan;
            responseData.subscriptionEndDate = subscription.endDate;
        } else {
            // User does not have an active subscription
            responseData.subscriptionStatus = 'inactive';
        }

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
