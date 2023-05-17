using QualificationWorkForUniversity.Controllers.Order;
using QualificationWorkForUniversity.Models.Dtos.User;
using QualificationWorkForUniversity.Models.Requests.User;
using QualificationWorkForUniversity.Services.User.Abstractions;

namespace QualificationWorkForUniversity.Controllers.User
{
    [ApiController]
    [Route(ComponentDefaults.DefaultRoute)]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserItemService _userItemService;

        public UserController(
            ILogger<UserController> logger,
            IUserItemService userItemService)
        {
            _logger = logger;
            _userItemService = userItemService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(AddItemResponse<string?>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Add(AddUserRequest request)
        {
            var result = await _userItemService.AddAsync(new UserDto
            {
                Email = request.Email,
                Password = request.Password,
                Name = request.Name,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber
            });

            return Ok(new AddItemResponse<string?>() { Id = result });
        }

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(UpdateItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update(string id, AddUserRequest request)
        {
            var result = await _userItemService.UpdateAsync(id, request.Email, request.Password, request.Name, request.LastName, request.PhoneNumber);
            return Ok(new UpdateItemResponse<bool>() { IsUpdated = result });
        }

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(DeleteItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _userItemService.DeleteAsync(id);
            return Ok(new DeleteItemResponse<bool>() { IsDeleted = result });
        }
    }
}
