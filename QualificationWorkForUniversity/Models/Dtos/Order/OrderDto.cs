namespace QualificationWorkForUniversity.Models.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        public string UserId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Country { get; set; } = null!;

        public string Region { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Postcode { get; set; } = null!;

        public DateTime CreatedAt { get; set; }
    }
}
