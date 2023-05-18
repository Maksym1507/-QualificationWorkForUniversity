import BasketItemModel from "./basketItemModel";

interface OrderModel {
  userId: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  region: string;
  city: string;
  address: string;
  postcode: string;
  basketItems: BasketItemModel[]
};

export default OrderModel;