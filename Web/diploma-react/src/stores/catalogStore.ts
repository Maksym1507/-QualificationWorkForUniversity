import { makeAutoObservable, runInAction } from "mobx";
import { CatalogItemDto } from "../models/dtos/catalogItemsDto";
import * as catalogItemsApi from "../api/modules/catalogItems";
import CreateUpdateProductRequest from "../models/requests/createUpdateProductRequest";
import DeleteItemResponse from "../models/responses/deleteItemResponse";
import { basketStore } from "../App";

class CatalogStore {
  singleCatalogItem: CatalogItemDto = {} as CatalogItemDto;
  currentPage = 1;
  totalPages = 0;
  pageSize = 6;
  filter = "titleByAsc";

  items: CatalogItemDto[] = [];
  isLoading = false;

  deleteItemResponse: DeleteItemResponse<boolean> = {} as DeleteItemResponse<boolean>;

  constructor() {
    makeAutoObservable(this);
    runInAction(this.prefetchData);
  }

  prefetchData = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      })
      const pageIndex = this.currentPage - 1;
      let res = await catalogItemsApi.getCatalogItems(pageIndex, this.pageSize, this.filter);
      this.items = res.data;
      this.totalPages = Math.ceil(res.count / this.pageSize);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    runInAction(() => {
      this.isLoading = false;
    })
  };

  async getSingleCatalogItem(id: number) {
    try {
      this.isLoading = true;
      const res = await catalogItemsApi.getCatalogItemById(id);
      this.singleCatalogItem = res;
      console.log(res);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    this.isLoading = false;
  }

  changeCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

  changeFilter(filter: string) {
    this.filter = filter;
  }

  async createCatalogItem(newCatalogItem: CreateUpdateProductRequest) {
    return await catalogItemsApi.addCatalogItem(newCatalogItem);
  }

  async updateCatalogItem(id: number, updatedCatalogItem: CreateUpdateProductRequest) {
    return await catalogItemsApi.updateCatalogItem(id, updatedCatalogItem);
  }

  async deleteCatalogItem(id: number, navigation: Function) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      this.deleteItemResponse = await catalogItemsApi.deleteCatalogItem(id);
    }

    if (this.deleteItemResponse) {
      const isFound = this.items.findIndex((x) => x.id === id);

      basketStore.deleteItem(id);
      this.items.splice(isFound, 1);

      alert("Product has been removed");
      this.rebootDeleteItemResponse();
      navigation(-1);
    }

    if (!this.deleteItemResponse) {
      alert("Something was wrong. Try again");
      this.rebootDeleteItemResponse();
    }
  }

  rebootDeleteItemResponse() {
    runInAction(async () => {
      this.deleteItemResponse = {} as DeleteItemResponse<boolean>;
    });
  }
}

export default CatalogStore;
