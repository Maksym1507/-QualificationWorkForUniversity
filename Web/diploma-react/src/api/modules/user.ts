import { config } from "../../constants/api-constants";
import apiClient from "../client";

export const getUserById = (id: string) =>
  apiClient({
    url: `${config.USER_URL}/${id}`,
    path: "",
    method: "GET",
  });