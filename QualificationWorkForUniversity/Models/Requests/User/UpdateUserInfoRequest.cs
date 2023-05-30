namespace QualificationWorkForUniversity.Models.Requests.User
{
    public class UpdateUserInfoRequest
    {
        [Required]
        [EmailAddress(ErrorMessage = "Incorrent email format")]
        public string Email { get; set; } = null!;

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string LastName { get; set; } = null!;

        [Required]
        [Phone]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; } = null!;
    }
}
