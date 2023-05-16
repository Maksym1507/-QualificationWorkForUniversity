namespace QualificationWorkForUniversity.Data.Entities
{
    public class UserEntity
    {
        public string Id { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public List<OrderEntity> Orders { get; set; } = new ();
    }
}
