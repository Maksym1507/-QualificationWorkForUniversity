namespace QualificationWorkForUniversity.Services.Abstractions
{
    public interface ICatalogItemService
    {
        Task<int?> AddAsync(string title, string description, decimal price,  double weight, string pictureFileName);

        Task<bool> UpdateAsync(int id, string title, string description, decimal price, double weight, string pictureFileName);

        Task<bool> DeleteAsync(int id);
    }
}
