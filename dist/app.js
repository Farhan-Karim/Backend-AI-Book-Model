"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
// Create an Express application
const app = (0, express_1.default)();
const PORT = 4200;
// Middleware to parse JSON request bodies
app.use(body_parser_1.default.json());
// Log the request body before processing
app.use((req, res, next) => {
    console.log('Received request body:', req.body);
    next();
});
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/search", searchRoutes_1.default);
app.use("/api/subscription", subscriptionRoutes_1.default);
// MongoDB connection
mongoose_1.default.connect("mongodb://localhost:27017/book_ai")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
