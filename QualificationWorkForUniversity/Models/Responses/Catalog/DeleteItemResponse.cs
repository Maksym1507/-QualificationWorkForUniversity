namespace QualificationWorkForUniversity.Models.Responses.Catalog
{
    public class DeleteItemResponse<T>
    {
        public T IsDeleted { get; set; } = default!;
    }
}
