namespace QualificationWorkForUniversity.Data.Entities
{
    public class CatalogEntity
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string PictureFileName { get; set; } = null!;

        public decimal Price { get; set; }

        public double Weight { get; set; }

        public List<OrderDetailsEntity> OrderProducts { get; set; } = new ();
    }
}