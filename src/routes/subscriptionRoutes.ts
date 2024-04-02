// // src/routes/subscriptionRoutes.ts

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

import express from 'express';
import { subscribe, unsubscribe, getSubscriptionStatus } from '../controller/subscriptionController';

const router = express.Router();

router.post('/subscribe', subscribe);
router.delete('/unsubscribe/:id', unsubscribe);
router.get('/status/:userId', getSubscriptionStatus);

export default router;
