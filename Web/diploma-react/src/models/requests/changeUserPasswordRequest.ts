export default interface ChangeUserPasswordRequest {
  oldPassword: string,
  newPassword: string,
  passwordConfirm: string
}