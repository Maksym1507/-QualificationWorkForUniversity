using QualificationWorkForUniversity.Models.Dtos.Catalog;

namespace QualificationWorkForUniversity.Mapping
{
    public class CatalogItemPictureResolver : IMemberValueResolver<CatalogEntity, CatalogItemDto, string, object>, IMemberValueResolver<CatalogEntity, ProductToBasketModel, string, object>
    {
        private readonly CatalogConfig _config;

        public CatalogItemPictureResolver(IOptionsSnapshot<CatalogConfig> config)
        {
            _config = config.Value;
        }

        public object Resolve(CatalogEntity source, CatalogItemDto destination, string sourceMember, object destMember, ResolutionContext context)
        {
            return $"{_config.Host}/{_config.ImgUrl}/{sourceMember}";
        }

        public object Resolve(CatalogEntity source, ProductToBasketModel destination, string sourceMember, object destMember, ResolutionContext context)
        {
            return $"{_config.Host}/{_config.ImgUrl}/{sourceMember}";
        }
    }
}
