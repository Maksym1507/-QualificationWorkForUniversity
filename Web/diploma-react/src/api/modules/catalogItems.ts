import { config } from "../../constants/api-constants";
import apiClient from "../client";

export const getCatalogItemById = (id: string) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `itemById/${id}`,
    method: "POST",
  });

export const getCatalogItems = (pageIndex: number, pageSize: number) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `items`,
    method: "POST",
    body: { pageIndex, pageSize }
  });