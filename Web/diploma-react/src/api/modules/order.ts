import { config } from "../../constants/api-constants";
import OrderModel from "../../models/orderModel";
import apiClient from "../client";

export const getOrderByUserId = (userId: string) =>
  apiClient({
    url: `${config.ORDER_URL}?userId=${userId}`,
    method: "GET"
  });

export const doOrder = (order: OrderModel) =>
  apiClient({
    url: config.ORDER_URL,
    method: "POST",
    body: order
  });