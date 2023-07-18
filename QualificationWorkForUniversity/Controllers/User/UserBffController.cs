namespace QualificationWorkForUniversity.Controllers
{
    [Authorize(Roles = "admin")]
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

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(UserResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _userService.GetUserByIdAsync(id);
            return Ok(result);
        }

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(UpdateItemResponse<bool>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateUserInfo(string id, UpdateUserInfoRequest request)
        {
            var result = await _userService.UpdateUserInfoAsync(id, request.Email, request.Name, request.LastName, request.PhoneNumber);
            return Ok(new UpdateItemResponse<bool>() { IsUpdated = result });
        }

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(ChangeUserPasswordResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangePassword(string id, ChangeUserPasswordRequest request)
        {
            var result = await _userService.ChangePasswordAsync(id, request.OldPassword, request.NewPassword);
            return Ok(result);
        }
    }
}
