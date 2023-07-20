using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace QualificationWorkForUniversity.Services.Catalog
{
    public class CatalogService : BaseDataService<ApplicationDbContext>, ICatalogService
    {
        private readonly ICatalogItemRepository _catalogItemRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CatalogService> _loggerService;

        public CatalogService(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<BaseDataService<ApplicationDbContext>> logger,
            ICatalogItemRepository catalogItemRepository,
            IMapper mapper,
            ILogger<CatalogService> loggerService)
            : base(dbContextWrapper, logger)
        {
            _catalogItemRepository = catalogItemRepository;
            _mapper = mapper;
            _loggerService = loggerService;
        }

        public async Task<PaginatedItemsResponse<CatalogItemDto>?> GetCatalogItemsAsync(int pageSize, int pageIndex, string filter)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var result = await _catalogItemRepository.GetByPageAsync(pageIndex, pageSize, filter);

                if (!result.Data.Any())
                {
                    _loggerService.LogWarning($"Not founded catalog items on page = {pageIndex}, with page size = {pageSize}");
                    return null;
                }

                return new PaginatedItemsResponse<CatalogItemDto>()
                {
                    Count = result.TotalCount,
                    Data = result.Data.Select(s => _mapper.Map<CatalogItemDto>(s)).ToList(),
                    PageIndex = pageIndex,
                    PageSize = pageSize
                };
            });
        }

        public async Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var result = await _catalogItemRepository.GetByIdAsync(id);

                if (result == null)
                {
                    _loggerService.LogWarning($"Not founded catalog item with Id = {id}");
                    return null;
                }

                return _mapper.Map<CatalogItemDto>(result);
            });
        }

        public async Task<int?> AddAsync(string title, string description, decimal price, double weight, string pictureFileName)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var id = await _catalogItemRepository.AddAsync(title, description, price, weight, pictureFileName);
                _loggerService.LogInformation($"Created catalog item with Id = {id}");
                return id;
            });
        }

        public async Task<bool> UpdateAsync(int id, string title, string description, decimal price, double weight, string pictureFileName)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var itemToUpdate = await _catalogItemRepository.GetByIdAsync(id);

                if (itemToUpdate == null)
                {
                    _loggerService.LogWarning($"Not founded catalog item with Id = {id}");
                    return false;
                }

                itemToUpdate.Title = title;
                itemToUpdate.Description = description;
                itemToUpdate.Price = price;
                itemToUpdate.Weight = weight;
                itemToUpdate.PictureFileName = pictureFileName;

                var isUpdated = await _catalogItemRepository.UpdateAsync(itemToUpdate);
                _loggerService.LogInformation($"Updated catalog item with Id = {id}");
                return isUpdated;
            });
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var itemToDelete = await _catalogItemRepository.GetByIdAsync(id);

                if (itemToDelete == null)
                {
                    _loggerService.LogWarning($"Not founded catalog item with Id = {id}");
                    return false;
                }

                var isDeleted = await _catalogItemRepository.DeleteAsync(itemToDelete);
                _loggerService.LogInformation($"Removed catalog item with Id = {id}");
                return isDeleted;
            });
        }
    }
}
