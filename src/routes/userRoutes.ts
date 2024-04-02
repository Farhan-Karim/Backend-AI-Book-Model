import express from 'express';
import { getUserProfile, updateUserProfile } from '../controller/userController';
import { authenticateUser } from '../middleware/authMiddleware'; // Correct import path

const router = express.Router();

// Protect routes with authentication middleware
router.use(authenticateUser); // Use the correct middleware function here
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;
