export default interface RegisterUserRequest {
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  lastName: string,
  phoneNumber: string
}