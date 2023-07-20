namespace QualificationWorkForUniversity.Models.Responses.User
{
    public class UserResponse
    {
        public string Id { get; set; } = null!;

        public string? Role { get; set; }

        public string? Email { get; set; }

        public string? Name { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
