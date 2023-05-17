namespace QualificationWorkForUniversity.Repositories.User.Abstractions
{
    public interface IUserRepository
    {
        Task<UserEntity?> GetByIdAsync(string id);

        Task<string?> AddAsync(UserEntity user);

        Task<bool> UpdateAsync(UserEntity item);

        Task<bool> DeleteAsync(UserEntity item);
    }
}
