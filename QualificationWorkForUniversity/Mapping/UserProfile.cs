using QualificationWorkForUniversity.Models.Dtos.User;

namespace QualificationWorkForUniversity.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AddUserRequest, UserEntity>();

            CreateMap<UserEntity, UserResponse>()
                .ForMember(destination => destination.Role, opt => opt.MapFrom(src => src.Role.Name));

            CreateMap<UserDto, UserEntity>()
                 .ForMember(destination => destination.Password, opt => opt.MapFrom(src => HashPasswordService.HashPassword(src.Password!)))
                .AfterMap((source, destination) => destination.Id = Guid.NewGuid().ToString());
        }
    }
}
