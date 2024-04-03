// src/app.ts

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import searchRoutes from './routes/searchRoutes';
import subscriptionRouters from './routes/subscriptionRoutes';
import Cors from 'cors';

// Create an Express application
const app = express();
const PORT = 5000;
app.use(Cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Log the request body before processing
app.use((req, res, next) => {
  console.log('Received request body:', req.body);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/subscription", subscriptionRouters)

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/book_ai")
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

