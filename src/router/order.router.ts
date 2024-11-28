import express from 'express';
import { createOrder, deleteOrderById, getAllOrder, getOrderById, updateOrderById } from '../controller/order.controller';

const router = express.Router();

router.route('/createOrder').post(createOrder)
router.route('/getAllOrder').get(getAllOrder)
router.route('/:id').get(getOrderById).put(updateOrderById).delete(deleteOrderById)

export default router;
