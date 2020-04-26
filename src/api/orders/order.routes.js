import express from 'express';
import OrderController from './order.controller';

const router = express.Router();

router.route('/').get(OrderController.list);

export default router;
