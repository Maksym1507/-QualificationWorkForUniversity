using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace QualificationWorkForUniversity.Services.Catalog.Abstractions
{
    public interface ICatalogService
    {
        Task<PaginatedItemsResponse<CatalogItemDto>?> GetCatalogItemsAsync(int pageSize, int pageIndex, string filter);

        Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id);

        Task<int?> AddAsync(string title, string description, decimal price, double weight, string pictureFileName);

        Task<bool> UpdateAsync(int id, string title, string description, decimal price, double weight, string pictureFileName);

        Task<bool> DeleteAsync(int id);
    }
}
