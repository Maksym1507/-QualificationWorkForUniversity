namespace QualificationWorkForUniversity.Models.Dtos.Catalog
{
    public class CatalogItemDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public double Weight { get; set; }

        public string PictureUrl { get; set; }
    }
}
