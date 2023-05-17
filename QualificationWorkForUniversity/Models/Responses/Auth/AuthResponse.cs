using QualificationWorkForUniversity.Models.Responses.User;

namespace QualificationWorkForUniversity.Models.Responses.Auth
{
    public class AuthResponse
    {
        public string? AccessToken { get; set; }

        public UserResponse? User { get; set; }
    }
}
