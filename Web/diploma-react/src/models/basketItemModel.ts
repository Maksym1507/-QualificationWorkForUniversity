import { ProductToBasketModel } from "./productToBasketModel"

interface BasketItemModel {
  product: ProductToBasketModel,
  count: number
};

export default BasketItemModel