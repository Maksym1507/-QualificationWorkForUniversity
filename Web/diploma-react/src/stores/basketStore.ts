import { makeAutoObservable } from "mobx";
import BasketItemModel from "../models/basketItemModel";

export class BasketStore {
  items: BasketItemModel[] = [];
  totalSum: number = 0;
  constructor() {
    makeAutoObservable(this);
    if (localStorage.getItem("basket")) {
      this.items = JSON.parse(localStorage.getItem("basket") || "");
    } else localStorage.setItem("basket", JSON.stringify(this.items));

    if (localStorage.getItem("totalSum")) {
      this.totalSum = JSON.parse(localStorage.getItem("totalSum") || "");
    } else localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
  }

  getTotalCountOfBasketItems() {
    return this.items.reduce((ac, item) => ac + item.count, 0);
  }

  addItem(item: BasketItemModel) {
    console.log(this.items);

    const isFound = this.items.findIndex(
      (x) => x.product.id === item.product.id
    );
    if (isFound !== -1) {
      this.items[isFound].count++;
      this.totalSum += item.count * item.product.price;
    }

    if (isFound === -1) {
      this.items.push(item);
      this.totalSum += item.product.price;
    }

    console.log(this.items);

    localStorage.setItem("basket", JSON.stringify(this.items));
    localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
  }

  deleteItem(id: number) {
    const isFound = this.items.findIndex((x) => x.product.id === id);

    if (isFound !== -1) {
      this.totalSum -= this.items[isFound].count * this.items[isFound].product.price;
      this.items.splice(isFound, 1);

      localStorage.setItem("basket", JSON.stringify(this.items));
      localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
    }
  }

  increaseItemCount(id: number) {
    const isFound = this.items.findIndex((x) => x.product.id === id);

    this.items[isFound].count++;
    this.totalSum += this.items[isFound].product.price;

    localStorage.setItem("basket", JSON.stringify(this.items));
    localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
  }

  decreaseItemCount(id: number) {
    debugger;
    const isFound = this.items.findIndex((x) => x.product.id === id);

    if (this.items[isFound].count === 1) {
      this.deleteItem(id);
    }
    else {
      this.items[isFound].count -= 1;
      this.totalSum -= this.items[isFound].product.price;
    }

    localStorage.setItem("basket", JSON.stringify(this.items));
    localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
  }

  truncateBasket() {
    this.items = [];
    this.totalSum = 0;
    localStorage.setItem("basket", JSON.stringify(this.items));
    localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
  }
}
