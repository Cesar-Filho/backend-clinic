import express from 'express';
import OrderController from './order.controller';
import { postSchema, querySchema } from './order.validate';
import validation from '../middlewares/validation';

const router = express.Router();

router.route('/').get(validation(querySchema, 'query'), OrderController.list).post(validation(postSchema), OrderController.create);

export default router;
