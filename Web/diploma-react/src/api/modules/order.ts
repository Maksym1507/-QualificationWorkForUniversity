import { config } from "../../constants/api-constants";
import OrderModel from "../../models/orderModel";
import apiClient from "../client";

export const getOrdersByUserId = (userId: string) =>
  apiClient({
    url: `${config.ORDER_URL}`,
    path: `getordersbyuserid?userId=${userId}`,
    method: "POST"
  });

export const doOrder = (order: OrderModel) =>
  apiClient({
    url: config.ORDER_URL,
    path: "doorder",
    method: "POST",
    body: order
  });