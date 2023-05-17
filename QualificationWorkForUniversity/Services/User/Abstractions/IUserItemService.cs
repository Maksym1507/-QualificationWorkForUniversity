using QualificationWorkForUniversity.Models.Dtos.User;

namespace QualificationWorkForUniversity.Services.User.Abstractions
{
    public interface IUserItemService
    {
        Task<string?> AddAsync(UserDto user);

        Task<UserEntity?> GetUserByEmailAsync(string email);

        Task<UserEntity?> GetUserByEmailAndPasswordAsync(string email, string password);

        Task<bool> UpdateAsync(string id, string email, string password, string name, string lastName, string phoneNumber);

        Task<bool> DeleteAsync(string id);
    }
}
