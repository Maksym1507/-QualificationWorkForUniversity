import { ProductToBasketModel } from "./productToBasketModel"

interface BasketItemModel {
  product: ProductToBasketModel,
  count: number,
  price: number
};

export default BasketItemModel