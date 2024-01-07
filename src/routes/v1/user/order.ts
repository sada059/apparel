import express from 'express';
import OrderController from '../../../controllers/OrderController';

const router = express.Router();

router.get('/checkFulfillment', OrderController.checkFulfillment);
router.get('/getLowestCost', OrderController.getLowestCost);

export default router;
