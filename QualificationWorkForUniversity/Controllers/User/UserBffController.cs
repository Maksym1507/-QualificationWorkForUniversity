using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [ApiController]
    [Route(ComponentDefaults.DefaultRoute)]
    public class UserBffController : ControllerBase
    {
        private readonly ILogger<UserBffController> _logger;
        private readonly IUserService _userService;

        public UserBffController(
            ILogger<UserBffController> logger,
            IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [Authorize]
        [HttpPost("{id}")]
        [ProducesResponseType(typeof(UserResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _userService.GetUserByIdAsync(id);
            return Ok(result);
        }
    }
}
