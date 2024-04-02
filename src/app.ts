// src/app.ts

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import searchRoutes from './routes/searchRoutes';
import subscriptionRouters from './routes/subscriptionRoutes';

// Create an Express application
const app = express();
const PORT = 4200;

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

