using IdentityServer.Data;
using IdentityServer.Data.Entities;
using IdentityServer.Repositories.Abstractions;
using Infrastructure.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<UserRepository> logger)
        {
            _dbContext = dbContextWrapper.DbContext;
            _logger = logger;
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _dbContext.Users.Include(i => i.Role).FirstOrDefaultAsync(f => f.Email == email);
        }
    }
}
