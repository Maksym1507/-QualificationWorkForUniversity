using QualificationWorkForUniversity.Repositories.User.Abstractions;

namespace QualificationWorkForUniversity.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<CatalogItemRepository> _logger;

        public UserRepository(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<CatalogItemRepository> logger)
        {
            _dbContext = dbContextWrapper.DbContext;
            _logger = logger;
        }

        public async Task<string?> AddAsync(UserEntity user)
        {
            var item = await _dbContext.AddAsync(user);

            await _dbContext.SaveChangesAsync();

            return item.Entity.Id;
        }

        public async Task<UserEntity?> GetByIdAsync(string id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(a => a.Email == email);
        }

        public async Task<UserEntity?> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(a => a.Email == email && a.Password == password);
        }

        public async Task<bool> UpdateAsync(UserEntity item)
        {
            _dbContext.Users.Update(item);

            var quantityCatalogItemsUpdated = await _dbContext.SaveChangesAsync();

            if (quantityCatalogItemsUpdated > 0)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteAsync(UserEntity item)
        {
            _dbContext.Users.Remove(item);

            var quantityCatalogItemsRemoved = await _dbContext.SaveChangesAsync();

            if (quantityCatalogItemsRemoved > 0)
            {
                return true;
            }

            return false;
        }
    }
}
