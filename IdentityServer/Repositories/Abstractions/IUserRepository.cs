using IdentityServer.Data.Entities;

namespace IdentityServer.Repositories.Abstractions
{
    public interface IUserRepository
    {
        public Task<UserEntity?> GetByEmailAsync(string email);
    }
}
