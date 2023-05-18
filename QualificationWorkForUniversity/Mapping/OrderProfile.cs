namespace QualificationWorkForUniversity.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<AddOrderForApiRequest, OrderEntity>()
                .AfterMap((source, destination) => destination.CreatedAt = DateTime.UtcNow.Date);

            CreateMap<BasketItemRequest, OrderDetailsEntity>();

            CreateMap<OrderEntity, OrderResponse>()
                .ForMember(destination => destination.OrderProducts, source => source.MapFrom(src => src.OrderProducts.ToArray()));

            CreateMap<OrderDetailsEntity, OrderDetailsResponse>();

            CreateMap<OrderEntity, OrderDto>();

            CreateMap<OrderDetailsEntity, OrderDetailsDto>();
        }
    }
}
