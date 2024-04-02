import { Request, Response } from "express";
import User from "../models/User";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Get the user ID from the request
    const userId = (req as any).user.id; // Assuming the user ID is set in the request object by authentication middleware

    // Find the user by ID in the database
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile data
    res.status(200).json({ userProfile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Assuming the user ID is set in the request object by authentication middleware
  const { email, fullName, lawFirm, areaOfPractice } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided in the request body
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (lawFirm) user.lawFirm = lawFirm;
    if (areaOfPractice) user.areaOfPractice = areaOfPractice;

    // Save the updated user profile
    await user.save();

    // Return success response
    res.status(200).json({
      message: "Profile updated successfully",
      userProfile: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
