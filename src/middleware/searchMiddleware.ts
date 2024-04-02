// searchMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import SearchHistoryModel from '../models/searchHistoryModel';
import { authenticateUser } from './authMiddleware'; // Adjust the import statement

export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userId: string | undefined;

        if ((req as any).user && (req as any).user.id) { // Adjust the type casting
            userId = (req as any).user.id;
        } else {
            throw new Error('User ID not found in request');
        }

        // Extract search data from the request body
        const { prompt, response } = req.body;

        // Create a new search history entry with the user ID
        const searchHistory = new SearchHistoryModel({ userId, prompt, response });
        await searchHistory.save();
        
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Error logging search history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





// // // searchMiddleware.ts

// // import { Request, Response, NextFunction } from 'express';
// // import SearchHistoryModel from '../models/searchHistoryModel';

// // export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         // Extract user ID from authentication middleware
// //         const userId = req.user.id; // Assuming you have middleware to set req.user.id after authentication
// //         const { query, results } = req.body; // Assuming the AI model response is in the request body

// //         // Create a new search history entry
// //         const searchHistory = new SearchHistoryModel({ userId, query, results });
// //         await searchHistory.save();
        
// //         next(); // Proceed to the next middleware
// //     } catch (error) {
// //         console.error('Error logging search history:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };

// // searchMiddleware.ts
// // searchMiddleware.ts

// // searchMiddleware.ts

// import { Request, Response, NextFunction } from 'express';
// import SearchHistoryModel from '../models/searchHistoryModel';

// export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // Check if user object exists in the request
//         if (!req.user || !req.user.id) {
//             throw new Error('User ID not found in request');
//         }

//         // Extract user ID from the request
//         const userId = req.user.id;

//         // Extract search data from the request body
//         const { prompt, response } = req.body;

//         // Create a new search history entry
//         const searchHistory = new SearchHistoryModel({ userId, prompt, response });
//         await searchHistory.save();
        
//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error('Error logging search history:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };







// // import { Request, Response, NextFunction } from 'express';
// // import SearchHistoryModel, { SearchHistory } from '../models/searchHistoryModel';

// // export const logSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         // Extract user ID from authentication middleware
// //         const userId = req.user ? req.user.id : 'unknown'; // Assuming you have middleware to set req.user.id after authentication
// //         const { query, results } = req.body; // Assuming the AI model response is in the request body

// //         // Create a new search history entry if user is authenticated
// //         if (userId !== 'unknown') {
// //             const searchHistory: SearchHistory = new SearchHistoryModel({ userId, query, results });
// //             await searchHistory.save();
// //         }
        
// //         next(); // Proceed to the next middleware
// //     } catch (error) {
// //         console.error('Error logging search history:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };
