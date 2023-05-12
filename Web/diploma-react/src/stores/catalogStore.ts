import { makeAutoObservable, runInAction } from "mobx";
import { CatalogItemDto } from "../models/dtos/catalogItemsDto";
import * as catalogItemsApi from "../api/modules/catalogItems";

class CatalogStore {
  singleCatalogItem: CatalogItemDto = {} as CatalogItemDto;
  currentPage = 1;
  totalPages = 0;
  pageSize = 6;
  filter: {
    "Type": number | null;
  };
  items: CatalogItemDto[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.filter = null!;
    runInAction(this.prefetchData);
  }

  prefetchData = async () => {
    try {
      this.isLoading = true;
      const pageIndex = this.currentPage;
      const res = await catalogItemsApi.getCatalogItemsWithPagination(pageIndex, this.pageSize);
      this.items = res;
      console.log(res);

      const totalProducts = await catalogItemsApi.getCatalogItems();

      this.totalPages = Math.ceil(totalProducts.length / this.pageSize);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    this.isLoading = false;
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
}

export default CatalogStore;
