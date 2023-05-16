import { makeAutoObservable, runInAction } from "mobx";
import { userStore } from "../App";
import OrderModel from "../models/orderModel";
import OrderResponse from "../models/responses/orderResponse";
import * as orderApi from "../api/modules/order";
import OrderDetailsResponse from "../models/responses/orderDetailsResponse";

export class OrderStore {
  orders: OrderResponse[] = [];
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
    runInAction(this.prefetchData);
  }

  prefetchData = async () => {
    try {
      this.isLoading = true;
      const res = await orderApi.getOrderByUserId(userStore.user.id ?? "default");
      this.orders = res;
      console.log(res);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    this.isLoading = false;
  };

  doOrder = async (order: OrderModel) => {
    var doOrderResponse = await orderApi.doOrder(order);
    await this.prefetchData();
    return doOrderResponse;
  }

  getTotalCountOfBasketItems(orderDetails: OrderDetailsResponse[]) {
    return orderDetails.reduce((ac, item) => ac + item.count * item.product.price, 0);
  }
}
