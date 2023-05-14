import { makeAutoObservable } from "mobx";
import UserModel from "../models/userModel";
import * as usersApi from "../api/modules/user";
import * as authApi from "../api/modules/auth";
import RegisterUserRequest from "../models/requests/registerUserRequest";

export class UserStore {
  isAutificated: boolean = false;
  show: boolean = false;
  user: UserModel = {} as UserModel;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async userRegister(user: RegisterUserRequest) {
    return await authApi.userRegister(user);
  }

  async userLogin(email: string, password: string) {
    debugger;
    return await authApi.userLogin({ email, password });
  }

  public async getUser(id: string) {
    return await usersApi.getUserById(id);
  }

  userLogout() {
    this.isAutificated = false;
    this.user = {} as UserModel;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You are log out");
  }

  private async init() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user") || "");
      if (this.user.email) {
        this.isAutificated = true;
      }
    } else {
      localStorage.setItem("user", JSON.stringify(this.user));
    }
  }
}