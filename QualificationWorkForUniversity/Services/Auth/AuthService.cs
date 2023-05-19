using QualificationWorkForUniversity.Models.Dtos.User;

namespace QualificationWorkForUniversity.Services.Auth
{
    public class AuthService : BaseDataService<ApplicationDbContext>, IAuthService
    {
        private readonly IMapper _mapper;
        private readonly IUserItemService _userItemService;
        private readonly ILogger<UserService> _loggerService;
        private readonly ITokenService _tokenService;

        public AuthService(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            IUserItemService userItemService,
            ILogger<BaseDataService<ApplicationDbContext>> logger,
            ILogger<UserService> loggerService,
            ITokenService tokenService,
            IMapper mapper)
            : base(dbContextWrapper, logger)
        {
            _userItemService = userItemService;
            _loggerService = loggerService;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<string> SignUpUserAsync(UserDto request)
        {
            var user = await _userItemService.GetUserByEmailAsync(request.Email!);

            if (user != null)
            {
                _loggerService.LogError("Failed add user to db");
                throw new Exception("Account has already existed");
            }

            var result = await _userItemService.AddAsync(request);

            if (result == null)
            {
                _loggerService.LogError("Unsuccesfull try to sign up");
                return "Unsuccesfull try to sign up";
            }

            _loggerService.LogInformation($"User with id = {result} has been added");
            return "You are sign up";
        }

        public async Task<LoginResponse> LoginUserAsync(LoginRequest request)
        {
            LoginResponse authResponse = null!;

            var accessToken = await _tokenService.GetToken(request.Email!, request.Password!);

            var account = await _userItemService.GetUserByEmailAndPasswordAsync(request.Email!, HashPasswordService.HashPassword(request.Password!));

            if (account != null)
            {
                authResponse = new LoginResponse()
                {
                    AccessToken = accessToken,
                    User = _mapper.Map<UserResponse>(account)
                };
            }

            return authResponse;
        }
    }
}
