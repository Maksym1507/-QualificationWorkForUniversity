using QualificationWorkForUniversity.Models;

namespace QualificationWorkForUniversity.Repositories.Abstractions
{
    public interface IOrderItemRepository
    {
        Task<int?> AddOrderAsync(string userId, string name, string lastName, string phoneNumber, string email, string country, string region, string city, string address, string postcode, List<BasketModel> items);

        Task<OrderEntity?> GetByIdAsync(int id);

        Task<bool> DeleteOrderAsync(OrderEntity order);
    }
}
