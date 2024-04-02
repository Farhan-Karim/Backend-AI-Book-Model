"use strict";
// // src/routes/subscriptionRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
// import { subscribe, unsubscribe, getSubscriptionStatus } from '../controller/subscriptionController';
// const router = express.Router();
// router.post('/subscribe', subscribe);
// router.delete('/unsubscribe/:id', unsubscribe);
// router.get('/status/:userId', getSubscriptionStatus);
// export default router;
// second response
// import express from 'express';
// import { subscribe, unsubscribe, getSubscriptionStatus } from '../controller/subscriptionController';
// const router = express.Router();
// router.post('/sub', subscribe);
// router.delete('/unsubscribe/:id', unsubscribe);
// router.get('/status/:userId', getSubscriptionStatus);
// export default router;
// third response
// subscriptionRoutes.ts
const express_1 = __importDefault(require("express"));
const subscriptionController_1 = require("../controller/subscriptionController");
const router = express_1.default.Router();
router.post('/subscribe', subscriptionController_1.subscribe);
router.delete('/unsubscribe/:id', subscriptionController_1.unsubscribe);
router.get('/status/:userId', subscriptionController_1.getSubscriptionStatus);
exports.default = router;
