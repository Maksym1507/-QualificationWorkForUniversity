namespace QualificationWorkForUniversity.Services
{
    public class OrderService : BaseDataService<ApplicationDbContext>, IOrderService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<OrderService> _loggerService;
        private readonly IOrderRepository _orderRepository;

        public OrderService(
            IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
            ILogger<BaseDataService<ApplicationDbContext>> logger,
            IOrderRepository orderRepository,
            ILogger<OrderService> loggerService,
            IMapper mapper)
            : base(dbContextWrapper, logger)
        {
            _loggerService = loggerService;
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<int?> DoOrderAsync(string userId, string name, string lastName, string phoneNumber, string email, string country, string region, string city, string address, string postcode, List<BasketModel> items)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var orderId = await _orderRepository.AddOrderAsync(userId, name, lastName, phoneNumber, email, country, region, city, address, postcode, items);

                if (orderId == 0)
                {
                    _loggerService.LogError("Failed add order to db");
                    return 0;
                }

                _loggerService.LogInformation($"Order with id = {orderId} has been added");
                return orderId;
            });
        }

        public async Task<IEnumerable<OrderResponse>> GetOrdersByUserIdAsync(string userId)
        {
            var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);

            if (orders!.Count() == 0)
            {
                _loggerService.LogWarning($"Not founded orders with user id = {userId}");
                return new List<OrderResponse>();
            }

            return orders!.Select(s => _mapper.Map<OrderResponse>(s));
        }
    }
}
