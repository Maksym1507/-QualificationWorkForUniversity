using QualificationWorkForUniversity.Services.Catalog.Abstractions;

namespace QualificationWorkForUniversity.Controllers.Catalog
{
    [Authorize]
    [ApiController]
    [Route(ComponentDefaults.DefaultRoute)]
    public class CatalogItemController : ControllerBase
    {
        private readonly ILogger<CatalogItemController> _logger;
        private readonly ICatalogItemService _catalogItemService;

        public CatalogItemController(
            ILogger<CatalogItemController> logger,
            ICatalogItemService catalogItemService)
        {
            _logger = logger;
            _catalogItemService = catalogItemService;
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(typeof(AddItemResponse<int?>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Add(CreateUpdateProductRequest request)
        {
            var result = await _catalogItemService.AddAsync(request.Title, request.Description, request.Price, request.Weight, request.PictureFileName);
            return Ok(new AddItemResponse<int?>() { Id = result });
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(typeof(UpdateItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update(int id, CreateUpdateProductRequest request)
        {
            var result = await _catalogItemService.UpdateAsync(id, request.Title, request.Description, request.Price, request.Weight, request.PictureFileName);
            return Ok(new UpdateItemResponse<bool>() { IsUpdated = result });
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(typeof(DeleteItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _catalogItemService.DeleteAsync(id);
            return Ok(new DeleteItemResponse<bool>() { IsDeleted = result });
        }
    }
}