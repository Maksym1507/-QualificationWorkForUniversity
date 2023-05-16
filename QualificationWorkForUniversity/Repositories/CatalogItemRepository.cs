namespace QualificationWorkForUniversity.Repositories
{
    public class CatalogItemRepository : ICatalogItemRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<CatalogItemRepository> _logger;

        public CatalogItemRepository(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<CatalogItemRepository> logger)
        {
            _dbContext = dbContextWrapper.DbContext;
            _logger = logger;
        }

        public async Task<PaginatedItems<CatalogEntity>> GetByPageAsync(int pageIndex, int pageSize)
        {
            IQueryable<CatalogEntity> query = _dbContext.CatalogItems;

            var totalItems = await query.LongCountAsync();

            var itemsOnPage = await query.OrderBy(c => c.Title)
               .Skip(pageSize * pageIndex)
               .Take(pageSize)
               .ToListAsync();

            return new PaginatedItems<CatalogEntity>() { TotalCount = totalItems, Data = itemsOnPage };
        }

        public async Task<CatalogEntity?> GetByIdAsync(int id)
        {
            return await _dbContext.CatalogItems.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<int?> AddAsync(string title, string description, decimal price, double weight, string pictureFileName)
        {
            var item = await _dbContext.AddAsync(new CatalogEntity
            {
                Description = description,
                Title = title,
                PictureFileName = pictureFileName,
                Price = price,
                Weight = weight,
            });

            await _dbContext.SaveChangesAsync();

            return item.Entity.Id;
        }

        public async Task<bool> UpdateAsync(CatalogEntity item)
        {
            _dbContext.CatalogItems.Update(item);

            var quantityCatalogItemsUpdated = await _dbContext.SaveChangesAsync();

            if (quantityCatalogItemsUpdated > 0)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteAsync(CatalogEntity item)
        {
            _dbContext.CatalogItems.Remove(item);

            var quantityCatalogItemsRemoved = await _dbContext.SaveChangesAsync();

            if (quantityCatalogItemsRemoved > 0)
            {
                return true;
            }

            return false;
        }
    }
}
