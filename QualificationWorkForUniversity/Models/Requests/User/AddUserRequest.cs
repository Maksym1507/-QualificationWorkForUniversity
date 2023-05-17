namespace QualificationWorkForUniversity.Models.Requests.User
{
    public class AddUserRequest
    {
        [Required]
        [EmailAddress(ErrorMessage = "Incorrent email format")]
        public string Email { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        [MinLength(4, ErrorMessage = "Property {0} must have minimum {1} symbols")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Password mismatch")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; }

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
