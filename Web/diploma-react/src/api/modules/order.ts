import { config } from "../../constants/api-constants";
import OrderModel from "../../models/orderModel";
import apiClient from "../client";

export const getOrderByUserId = (userId: string) =>
  apiClient({
    url: `${config.ORDER_URL}?userId=${userId}`,
    path: "",
    method: "GET"
  });

export const doOrder = (order: OrderModel) =>
  apiClient({
    url: config.ORDER_URL,
    path: "",
    method: "POST",
    body: order
  });