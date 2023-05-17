using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace QualificationWorkForUniversity.Services.Catalog.Abstractions
{
    public interface ICatalogService
    {
        Task<PaginatedItemsResponse<CatalogItemDto>?> GetCatalogItemsAsync(int pageSize, int pageIndex);

        Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id);
    }
}
