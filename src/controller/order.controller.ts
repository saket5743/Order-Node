import { Request, Response } from "express";
import asyncWrapper from "../utils/asyncWrapper.utils";
import Order from "../models/order.models";
import ApiError from "../utils/ApiError";
import { BOOL_TRUE, CODE_200, CODE_400, CREATED, DELETE, NOT_FOUND, RECEIVED, UPDATED } from "../utils/constants";
import ApiResponse from "../utils/ApiResponseCode";

// Create Order
export const createOrder = asyncWrapper(async (req: Request, res: Response) => {
  const order = await Order.create(req.body);
  if (!order) {
    return res.json(new ApiError(NOT_FOUND, CODE_400))
  }
  return res.json(new ApiResponse(CODE_200, order, CREATED, BOOL_TRUE));
});

// Get All Order
export const getAllOrder = asyncWrapper(async (req: Request, res: Response) => {
  const order = await Order.find();
  if (!order) {
    return res.json(new ApiError(NOT_FOUND, CODE_400))
  }
  return res.json(new ApiResponse(CODE_200, order, RECEIVED, BOOL_TRUE));
});

// Get Order by Id
export const getOrderById = asyncWrapper(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findById({ _id: orderId }, req.body);
  if (!order) {
    return res.json(new ApiError(NOT_FOUND, CODE_400))
  }
  return res.json(new ApiResponse(CODE_200, order, RECEIVED, BOOL_TRUE));
});

// Update Order by Id
export const updateOrderById = asyncWrapper(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findByIdAndUpdate({ _id: orderId }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true
  })
  if (!order) {
    return res.json(new ApiError(NOT_FOUND, CODE_400))
  }
  return res.json(new ApiResponse(CODE_200, order, UPDATED, BOOL_TRUE));
});

// Delete by Id
export const deleteOrderById = asyncWrapper(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findByIdAndDelete({ _id: orderId }, req.body);
  if (!order) {
    return res.json(new ApiError(NOT_FOUND, CODE_400))
  }
  return res.json(new ApiResponse(CODE_200, order, DELETE, BOOL_TRUE));
});