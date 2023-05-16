namespace QualificationWorkForUniversity.Data.EntityConfigurations
{
    public class OrderEntityTypeConfiguration : IEntityTypeConfiguration<OrderEntity>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<OrderEntity> builder)
        {
            builder.ToTable("Order");

            builder.HasKey(h => h.Id);

            builder.Property(p => p.Id)
                .UseHiLo("order_hilo")
                .IsRequired();

            builder.Property(p => p.UserId).IsRequired();
            builder.Property(p => p.Name).IsRequired();
            builder.Property(p => p.LastName).IsRequired();
            builder.Property(p => p.PhoneNumber).IsRequired();
            builder.Property(p => p.Email).IsRequired();
            builder.Property(p => p.Country).IsRequired();
            builder.Property(p => p.Region).IsRequired();
            builder.Property(p => p.City).IsRequired();
            builder.Property(p => p.Address).IsRequired();
            builder.Property(p => p.Postcode).IsRequired();

            builder.Property(p => p.CreatedAt).HasColumnType("date");
        }
    }
}
