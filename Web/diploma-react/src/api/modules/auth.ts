import { config } from "../../constants/api-constants";
import LoginUserRequest from "../../models/requests/loginUserRequest";
import RegisterUserRequest from "../../models/requests/registerUserRequest";
import apiClient from "../client";

export const userLogin = (data: LoginUserRequest) =>
  apiClient({
    url: `${config.AUTH_URL}`,
    method: "POST",
    path: "login",
    body: data
  });

export const userRegister = (data: RegisterUserRequest) =>
  apiClient({
    url: `${config.AUTH_URL}`,
    method: "POST",
    path: "register",
    body: data
  });