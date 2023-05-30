import { config } from "../../constants/api-constants";
import ChangeUserPasswordRequest from "../../models/requests/changeUserPasswordRequest";
import UpdateUserRequest from "../../models/requests/updateUserRequest";
import apiClient from "../client";

export const getUserById = (id: string) =>
  apiClient({
    url: `${config.USER_URL}`,
    path: `getbyid/${id}`,
    method: "POST",
  });

export const updateUser = (id: string, request: UpdateUserRequest) =>
  apiClient({
    url: `${config.USER_URL}`,
    path: `updateUserInfo/${id}`,
    method: "POST",
    body: request
  });

export const changeUserPassword = (id: string, request: ChangeUserPasswordRequest) =>
  apiClient({
    url: `${config.USER_URL}`,
    path: `changePassword/${id}`,
    method: "POST",
    body: request
  });