using System.ComponentModel.DataAnnotations;

namespace QualificationWorkForUniversity.Models.Requests.Catalog
{
    public class CreateUpdateProductRequest
    {
        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public double Weight { get; set; }

        [Required]
        public string PictureFileName { get; set; } = null!;
    }
}
