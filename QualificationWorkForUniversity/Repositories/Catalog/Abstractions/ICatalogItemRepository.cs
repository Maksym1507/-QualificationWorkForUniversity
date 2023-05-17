namespace QualificationWorkForUniversity.Repositories.Catalog.Abstractions
{
    public interface ICatalogItemRepository
    {
        Task<PaginatedItems<CatalogEntity>> GetByPageAsync(int pageIndex, int pageSize);

        Task<CatalogEntity?> GetByIdAsync(int id);

        Task<int?> AddAsync(string title, string description, decimal price, double weight, string pictureFileName);

        Task<bool> UpdateAsync(CatalogEntity item);

        Task<bool> DeleteAsync(CatalogEntity item);
    }
}
