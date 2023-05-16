using QualificationWorkForUniversity.Data.Entities;
using QualificationWorkForUniversity.Data.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using QualificationWorkForUniversity.Data.EntityConfiguration;

namespace QualificationWorkForUniversity.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CatalogEntity> CatalogItems { get; set; } = null!;

        public DbSet<UserEntity> Users { get; set; } = null!;

        public DbSet<OrderEntity> Orders { get; set; } = null!;

        public DbSet<OrderDetailsEntity> OrderProducts { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CatalogEntityTypeConfiguration());
            builder.ApplyConfiguration(new OrderEntityTypeConfiguration());
            builder.ApplyConfiguration(new OrderDetailsEntityTypeConfiguration());
            builder.ApplyConfiguration(new UserEntityConfiguration());
        }
    }
}
