using QualificationWorkForUniversity.Models.Dtos.User;

namespace QualificationWorkForUniversity.Services.Auth.Abstractions
{
    public interface IAuthService
    {
        Task<string> SignUpUserAsync(UserDto request);

        Task<AuthResponse> LoginUserAsync(LoginRequest request);
    }
}
