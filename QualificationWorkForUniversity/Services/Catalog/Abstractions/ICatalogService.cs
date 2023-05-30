using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace QualificationWorkForUniversity.Services.Catalog.Abstractions
{
    public interface ICatalogService
    {
        Task<PaginatedItemsResponse<CatalogItemDto>?> GetCatalogItemsAsync(int pageSize, int pageIndex, string filter);

        Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id);
    }
}
