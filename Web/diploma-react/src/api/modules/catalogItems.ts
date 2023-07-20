import { config } from "../../constants/api-constants";
import CreateUpdateProductRequest from "../../models/requests/createUpdateProductRequest";
import apiClient from "../client";

export const getCatalogItemById = (id: string) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `itemById/${id}`,
    method: "POST",
  });

export const getCatalogItems = (pageIndex: number, pageSize: number, filter: string) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `items`,
    method: "POST",
    body: { pageIndex, pageSize, filter }
  });

export const addCatalogItem = (request: CreateUpdateProductRequest) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `add`,
    method: "POST",
    body: request 
  });