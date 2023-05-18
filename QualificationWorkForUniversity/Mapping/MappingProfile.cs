using QualificationWorkForUniversity.Mapping;
using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace Catalog.Host.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CatalogEntity, CatalogItemDto>()
                .ForMember("PictureUrl", opt
                    => opt.MapFrom<CatalogItemPictureResolver, string>(c => c.PictureFileName));

            CreateMap<CatalogEntity, ProductToBasketModel>();
        }
    }
}
