using QualificationWorkForUniversity.Models.Dtos.User;
using QualificationWorkForUniversity.Repositories.User.Abstractions;
using QualificationWorkForUniversity.Services.User.Abstractions;

namespace QualificationWorkForUniversity.Services.User
{
    public class UserItemService : BaseDataService<ApplicationDbContext>, IUserItemService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserItemService> _loggerService;
        private readonly IMapper _mapper;

        public UserItemService(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<BaseDataService<ApplicationDbContext>> logger,
            IUserRepository userRepository,
            ILogger<UserItemService> loggerService,
            IMapper mapper)
            : base(dbContextWrapper, logger)
        {
            _userRepository = userRepository;
            _loggerService = loggerService;
            _mapper = mapper;
        }

        public async Task<string?> AddAsync(UserDto user)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var userToAdd = _mapper.Map<UserEntity>(user);
                var id = await _userRepository.AddAsync(userToAdd);
                _loggerService.LogInformation($"Created user item with Id = {id}");
                return id;
            });
        }

        public async Task<bool> UpdateAsync(string id, string email, string password, string name, string lastName, string phoneNumber)
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
                itemToUpdate.Password = HashPasswordService.HashPassword(password);
                itemToUpdate.Name = name;
                itemToUpdate.LastName = lastName;
                itemToUpdate.PhoneNumber = phoneNumber;

                var isUpdated = await _userRepository.UpdateAsync(itemToUpdate);
                _loggerService.LogInformation($"Updated user item with Id = {id}");
                return isUpdated;
            });
        }

        public async Task<bool> DeleteAsync(string id)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var itemToDelete = await _userRepository.GetByIdAsync(id);

                if (itemToDelete == null)
                {
                    _loggerService.LogWarning($"Not founded user item with Id = {id}");
                    return false;
                }

                var isDeleted = await _userRepository.DeleteAsync(itemToDelete);
                _loggerService.LogInformation($"Removed user item with Id = {id}");
                return isDeleted;
            });
        }

        public async Task<UserEntity?> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<UserEntity?> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            return await _userRepository.GetByEmailAndPasswordAsync(email, password);
        }
    }
}
