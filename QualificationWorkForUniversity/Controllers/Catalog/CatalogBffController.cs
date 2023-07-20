using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace QualificationWorkForUniversity.Controllers.Catalog
{
    [ApiController]
    [Route(ComponentDefaults.DefaultRoute)]
    public class CatalogBffController : ControllerBase
    {
        private readonly ILogger<CatalogBffController> _logger;
        private readonly ICatalogService _catalogService;

        public CatalogBffController(
            ILogger<CatalogBffController> logger,
            ICatalogService catalogService)
        {
            _logger = logger;
            _catalogService = catalogService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(PaginatedItemsResponse<CatalogItemDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Items(PaginatedItemsRequest request)
        {
            var result = await _catalogService.GetCatalogItemsAsync(request.PageSize, request.PageIndex, request.Filter);
            return Ok(result);
        }

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(CatalogItemDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ItemById(int id)
        {
            var result = await _catalogService.GetCatalogItemByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(typeof(AddItemResponse<int?>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Add(CreateUpdateProductRequest request)
        {
            var result = await _catalogService.AddAsync(request.Title, request.Description, request.Price, request.Weight, request.PictureFileName);
            return Ok(new AddItemResponse<int?>() { Id = result });
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(typeof(UpdateItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update(int id, CreateUpdateProductRequest request)
        {
            var result = await _catalogService.UpdateAsync(id, request.Title, request.Description, request.Price, request.Weight, request.PictureFileName);
            return Ok(new UpdateItemResponse<bool>() { IsUpdated = result });
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(typeof(DeleteItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _catalogService.DeleteAsync(id);
            return Ok(new DeleteItemResponse<bool>() { IsDeleted = result });
        }
    }
}
