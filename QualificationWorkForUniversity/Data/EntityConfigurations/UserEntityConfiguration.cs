using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QualificationWorkForUniversity.Data.Entities;

namespace QualificationWorkForUniversity.Data.EntityConfiguration
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("User");

            builder.HasKey(h => h.Id);
            builder.Property(p => p.Email).IsRequired();
            builder.Property(p => p.Password).IsRequired();
            builder.Property(p => p.Name).IsRequired();
            builder.Property(p => p.LastName).IsRequired();
            builder.Property(p => p.PhoneNumber).IsRequired();
        }
    }
}
