using QualificationWorkForUniversity.Models.Responses.User;
using QualificationWorkForUniversity.Repositories.User.Abstractions;
using QualificationWorkForUniversity.Services.User.Abstractions;

namespace QualificationWorkForUniversity.Services.User
{
    public class UserService : BaseDataService<ApplicationDbContext>, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _loggerService;

        public UserService(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<BaseDataService<ApplicationDbContext>> logger,
            IUserRepository userRepository,
            IMapper mapper,
            ILogger<UserService> loggerService)
            : base(dbContextWrapper, logger)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _loggerService = loggerService;
        }

        public async Task<UserResponse?> GetUserByIdAsync(string id)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var result = await _userRepository.GetByIdAsync(id);

                if (result == null)
                {
                    _loggerService.LogWarning($"Not founded catalog item with Id = {id}");
                    return null;
                }

                return _mapper.Map<UserResponse>(result);
            });
        }
    }
}
