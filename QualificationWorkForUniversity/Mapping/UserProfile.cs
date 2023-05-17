using QualificationWorkForUniversity.Models.Dtos.User;
using QualificationWorkForUniversity.Models.Requests.User;
using QualificationWorkForUniversity.Models.Responses.User;

namespace QualificationWorkForUniversity.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AddUserRequest, UserEntity>();

            CreateMap<UserEntity, UserResponse>();

            CreateMap<UserDto, UserEntity>()
                 .ForMember(destination => destination.Password, opt => opt.MapFrom(src => HashPasswordService.HashPassword(src.Password!)))
                .AfterMap((source, destination) => destination.Id = Guid.NewGuid().ToString());
        }
    }
}
