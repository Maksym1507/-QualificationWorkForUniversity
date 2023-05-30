using Newtonsoft.Json;
namespace QualificationWorkForUniversity.Models.Requests.Catalog
{
    public class PaginatedItemsRequest
    {
        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public string Filter { get; set; }
    }
}
