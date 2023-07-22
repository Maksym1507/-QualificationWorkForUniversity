import { config } from "../../constants/api-constants";
import CreateUpdateProductRequest from "../../models/requests/createUpdateProductRequest";
import apiClient from "../client";

export const getCatalogItemById = (id: number) =>
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

export const updateCatalogItem = (id: number, request: CreateUpdateProductRequest) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `update/${id}`,
    method: "POST",
    body: request
  });

export const deleteCatalogItem = (id: number) =>
  apiClient({
    url: config.PRODUCT_URL,
    path: `delete/${id}`,
    method: "POST"
  });