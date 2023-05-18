namespace QualificationWorkForUniversity.Services.Abstractions
{
    public interface IOrderItemService
    {
        Task<int?> AddAsync(string userId, string name, string lastName, BasketModel[] basketItems, string phoneNumber, string email, string country, string region, string city, string address, string potcode);

        Task<OrderDto?> GetOrderByIdAsync(int id);

        Task<bool> DeleteOrderAsync(int id);
    }
}
