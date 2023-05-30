namespace QualificationWorkForUniversity.Services.User.Abstractions
{
    public interface IUserService
    {
        Task<UserResponse?> GetUserByIdAsync(string id);

        Task<bool> UpdateUserInfoAsync(string id, string email, string name, string lastName, string phoneNumber);

        Task<ChangeUserPasswordResponse> ChangePasswordAsync(string id, string oldPassword, string newPassword);
    }
}
