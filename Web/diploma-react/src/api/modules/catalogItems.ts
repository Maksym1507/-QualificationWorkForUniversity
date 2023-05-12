import { config } from "../../constants/api-constants";
import apiClient from "../client";

export const getCatalogItemById = (id: string) =>
  apiClient({
    url: `${config.PRODUCT_URL}/${id}`,
    method: "GET",
  });

export const getCatalogItemsWithPagination = (pageIndex: number, pageSize: number) =>
  apiClient({
    url: `${config.PRODUCT_URL}?_page=${pageIndex}&_limit=${pageSize}`,
    method: "GET",
  });

  export const getCatalogItems = () =>
  apiClient({
    url: `${config.PRODUCT_URL}`,
    method: "GET",
  });