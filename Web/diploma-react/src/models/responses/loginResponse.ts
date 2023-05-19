import UserModel from "../userModel"

export default interface LoginResponse {
  accessToken: string,
  user: UserModel
};