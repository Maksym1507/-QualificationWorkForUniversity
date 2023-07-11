using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace QualificationWorkForUniversity.Data.EntityConfigurations
{
    public class CatalogEntityTypeConfiguration
        : IEntityTypeConfiguration<CatalogEntity>
    {
        public void Configure(EntityTypeBuilder<CatalogEntity> builder)
        {
            builder.ToTable("Catalog");

            builder.Property(p => p.Id)
            .UseHiLo("catalog_hilo")
            .IsRequired();

            builder.Property(p => p.Title)
                .IsRequired(true)
                .HasMaxLength(50);

            builder.Property(p => p.Price)
                .HasColumnType("money")
                .IsRequired(true);

            builder.Property(p => p.Weight)
                .IsRequired(true);

            builder.Property(p => p.PictureFileName)
                .IsRequired(false);
        }
    }
}
