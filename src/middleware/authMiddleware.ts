// authMiddleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Import your User model

// Define a custom Request type with the user property
interface AuthenticatedRequest extends Request {
    user?: { id: string }; // Define the structure of the user property as needed
}

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Extract the JWT token from the request headers or cookies
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        // Verify the token and extract user ID
        const decodedToken = jwt.verify(token, 'your-secret-key') as { userId: string };

        // Find the user in the database using the decoded user ID
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Set the user ID in the request object
        req.user = { id: decodedToken.userId };

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


