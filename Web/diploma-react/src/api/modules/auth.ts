import { config } from "../../constants/api-constants";
import LoginUserRequest from "../../models/requests/loginUserRequest";
import RegisterUserRequest from "../../models/requests/registerUserRequest";
import apiClient from "../client";

export const userLogin = (data: LoginUserRequest) =>
  apiClient({
    url: `${config.LOGIN_URL}`,
    method: "POST",
    path: "",
    body: data
  });

  export const userRegister = (data: RegisterUserRequest) =>
  apiClient({
    url: `${config.REGISTER_URL}`,
    method: "POST",
    path: "",
    body: data
  });