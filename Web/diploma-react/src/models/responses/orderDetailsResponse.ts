import { ProductToBasketModel } from "../productToBasketModel";

interface OrderDetailsResponse {
  product: ProductToBasketModel
  count: number;
};

export default OrderDetailsResponse;