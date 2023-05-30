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
    }
}
