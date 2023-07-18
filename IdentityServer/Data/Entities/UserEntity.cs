namespace IdentityServer.Data.Entities
{
    public class UserEntity
    {
        public string Id { get; set; } = null!;

        public RoleEntity Role { get; set; }

        public int RoleId { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Name { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
