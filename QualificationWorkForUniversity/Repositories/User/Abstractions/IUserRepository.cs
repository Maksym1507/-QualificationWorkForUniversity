using Microsoft.EntityFrameworkCore;

namespace QualificationWorkForUniversity.Repositories.User.Abstractions
{
    public interface IUserRepository
    {
        Task<string?> AddAsync(UserEntity user);

        Task<UserEntity?> GetByIdAsync(string id);

        Task<UserEntity?> GetByEmailAsync(string email);

        Task<UserEntity?> GetByEmailAndPasswordAsync(string email, string password);

        Task<bool> UpdateAsync(UserEntity item);

        Task<bool> DeleteAsync(UserEntity item);
    }
}
