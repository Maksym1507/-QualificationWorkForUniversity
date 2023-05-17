using QualificationWorkForUniversity.Models.Dtos.User;

namespace QualificationWorkForUniversity.Controllers
{
    [ApiController]
    [Route(ComponentDefaults.DefaultRoute)]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;

        public AuthController(
            ILogger<AuthController> logger,
            IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult> Register(UserDto request)
        {
            string message;

            try
            {
                message = await _authService.SignUpUserAsync(request);
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }

            return Ok(new { SuccesedMessage = message });
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            AuthResponse authResponse;

            try
            {
                authResponse = await _authService.LoginUserAsync(request);
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }

            return Ok(authResponse);
        }
    }
}
