import { makeAutoObservable, runInAction } from "mobx";
import { CatalogItemDto } from "../models/dtos/catalogItemsDto";
import * as catalogItemsApi from "../api/modules/catalogItems";

class CatalogStore {
  singleCatalogItem: CatalogItemDto = {} as CatalogItemDto;
  currentPage = 1;
  totalPages = 0;
  pageSize = 6;
  filter = "default";

  items: CatalogItemDto[] = [];
  isLoading = false;

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

  async getSingleCatalogItem(id: string) {
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
}

export default CatalogStore;
