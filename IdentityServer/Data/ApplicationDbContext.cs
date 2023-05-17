using Microsoft.EntityFrameworkCore;
using IdentityServer.Data.Entities;
using IdentityServer.Data.EntityConfiguration;

namespace IdentityServer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new UserEntityConfiguration());
        }
    }
}
