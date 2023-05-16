namespace QualificationWorkForUniversity.Models.Responses.Catalog
{
    public class ItemsResponse<T>
    {
        public IEnumerable<T> Data { get; init; } = null!;
    }
}
