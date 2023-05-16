using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QualificationWorkForUniversity.Data.Entities;

namespace QualificationWorkForUniversity.Data.EntityConfigurations
{
    public class OrderDetailsEntityTypeConfiguration : IEntityTypeConfiguration<OrderDetailsEntity>
    {
        public void Configure(EntityTypeBuilder<OrderDetailsEntity> builder)
        {
            builder.ToTable("OrderDetails");

            builder.HasKey(h => h.Id);

            builder.Property(p => p.Id)
                .UseHiLo("order_details_hilo")
                .IsRequired();

            builder.Property(h => h.OrderId).IsRequired();
            builder.Property(p => p.Count).IsRequired();

            builder.HasOne(h => h.Order)
                .WithMany(w => w.OrderProducts)
                .HasForeignKey(h => h.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
