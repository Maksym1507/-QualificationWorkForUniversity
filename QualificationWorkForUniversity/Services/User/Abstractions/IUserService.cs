using QualificationWorkForUniversity.Models.Dtos.User;
using QualificationWorkForUniversity.Models.Responses.User;

namespace QualificationWorkForUniversity.Services.User.Abstractions
{
    public interface IUserService
    {
        Task<UserResponse?> GetUserByIdAsync(string id);
    }
}
