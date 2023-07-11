import { makeAutoObservable } from "mobx";
import UserModel from "../models/userModel";
import * as usersApi from "../api/modules/user";
import * as authApi from "../api/modules/auth";
import RegisterUserRequest from "../models/requests/registerUserRequest";
import UpdateUserRequest from "../models/requests/updateUserRequest";
import ChangeUserPasswordRequest from "../models/requests/changeUserPasswordRequest";

export class UserStore {
  isAuthenticated: boolean = false;
  user: UserModel = {} as UserModel;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async userRegister(user: RegisterUserRequest) {
    return await authApi.userRegister(user);
  }

  async userLogin(email: string, password: string) {
    return await authApi.userLogin({ email, password });
  }

  async getUser(id: string) {
    return await usersApi.getUserById(id);
  }

  async updateUser(id: string, updatedUser: UpdateUserRequest) {
    return await usersApi.updateUser(id, updatedUser);
  }

  async changeUserPassword(id: string, changedPassword: ChangeUserPasswordRequest) {
    return await usersApi.changeUserPassword(id, changedPassword);
  }

  userLogout() {
    this.isAuthenticated = false;
    this.user = {} as UserModel;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You are log out");
  }

  private async init() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user") || "");
      if (this.user.email) {
        this.isAuthenticated = true;
      }
    } else {
      localStorage.setItem("user", JSON.stringify(this.user));
    }
  }
}