namespace QualificationWorkForUniversity.Data.Entities
{
    public class OrderDetailsEntity
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public OrderEntity? Order { get; set; }

        public int ProductId { get; set; }

        public CatalogEntity? Product { get; set; }

        public int Count { get; set; }
    }
}