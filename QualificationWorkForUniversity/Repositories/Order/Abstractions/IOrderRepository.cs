using QualificationWorkForUniversity.Models;

namespace QualificationWorkForUniversity.Repositories.Abstractions
{
    public interface IOrderRepository
    {
        Task<IEnumerable<OrderEntity>?> GetOrdersByUserIdAsync(string userId);

        Task<int?> AddOrderAsync(string userId, string name, string lastName, string phoneNumber, string email, string country, string region, string city, string address, string postcode, List<BasketModel> items);
    }
}
