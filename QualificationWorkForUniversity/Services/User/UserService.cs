using QualificationWorkForUniversity.Repositories.User.Abstractions;

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

        public async Task<bool> UpdateUserInfoAsync(string id, string email, string name, string lastName, string phoneNumber)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var itemToUpdate = await _userRepository.GetByIdAsync(id);

                if (itemToUpdate == null)
                {
                    _loggerService.LogWarning($"Not founded user item with Id = {id}");
                    return false;
                }

                itemToUpdate.Email = email;
                itemToUpdate.Name = name;
                itemToUpdate.LastName = lastName;
                itemToUpdate.PhoneNumber = phoneNumber;

                var isUpdated = await _userRepository.UpdateAsync(itemToUpdate);
                _loggerService.LogInformation($"Updated user item with Id = {id}");
                return isUpdated;
            });
        }

        public async Task<ChangeUserPasswordResponse> ChangePasswordAsync(string id, string oldPassword, string newPassword)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var user = await _userRepository.GetByIdAsync(id);

                if (user == null)
                {
                    _loggerService.LogWarning($"Not founded user item with Id = {id}");
                    return new ChangeUserPasswordResponse { Message = "Not founded user" };
                }

                if (user.Password != HashPasswordService.HashPassword(oldPassword))
                {
                    _loggerService.LogWarning("Wrong old password");
                    return new ChangeUserPasswordResponse { Message = "Wrong old password" };
                }

                user.Password = HashPasswordService.HashPassword(newPassword);

                var ischanged = await _userRepository.UpdateAsync(user);
                _loggerService.LogInformation($"Updated user item with Id = {id}");
                return new ChangeUserPasswordResponse { Message = "Password has been changed", IsChanged = ischanged };
            });
        }
    }
}
