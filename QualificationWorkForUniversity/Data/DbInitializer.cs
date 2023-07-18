namespace QualificationWorkForUniversity.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();

            if (!context.CatalogItems.Any())
            {
                await context.CatalogItems.AddRangeAsync(GetPreconfiguredItems());

                await context.SaveChangesAsync();
            }

            if (!context.Roles.Any())
            {
                await context.Roles.AddRangeAsync(GetPreconfiguredRoles());

                await context.SaveChangesAsync();
            }

            if (!context.Users.Any())
            {
                var adminRole = await context.Roles.Where(w => w.Name == "admin").FirstOrDefaultAsync();

                if (adminRole != null)
                {
                    await context.Users.AddAsync(new UserEntity()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Dima",
                        LastName = "admin",
                        Email = "admin@gmail.com",
                        Password = HashPasswordService.HashPassword("admin1234"),
                        PhoneNumber = "1234567890",
                        RoleId = adminRole.Id,
                    });

                    await context.SaveChangesAsync();
                }
            }
        }

        private static IEnumerable<CatalogEntity> GetPreconfiguredItems()
        {
            return new List<CatalogEntity>()
            {
                new CatalogEntity
                {
                    Description = "pepperoni, hunting sausages, feta, olives, sriracha, mozzarella, oregano, tomato sauce",
                    Title = "Pepperoni",
                    Price = 335,
                    Weight = 800,
                    PictureFileName = "1.png"
                },
                new CatalogEntity
                {
                    Description = "hunting sausages, champignons, parsley, ham, sriracha, mozzarella, oregano, tomato sauce",
                    Title = "Neapolitan",
                    Price = 199,
                    Weight = 400,
                    PictureFileName = "2.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, chicken fillet, hunting sausages, champignons, parsley, ham, tomato sauce, oregano",
                    Title = "European",
                    Price = 149,
                    Weight = 550,
                    PictureFileName = "3.png"
                },
                new CatalogEntity
                {
                    Description = "chicken fillet, game sausages, gherkins, mozzarella, croquettes, oregano, tomato sauce",
                    Title = "Ilma Pizza",
                    Price = 285,
                    Weight = 900,
                    PictureFileName = "4.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, ham, salami, hunting sausages, ham, bacon, olives, oregano, tomato sauce",
                    Title = "Pizza Mix",
                    Price = 260,
                    Weight = 450,
                    PictureFileName = "5.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, dorblu cheese, parmesan, hard cheese, bechamel sauce, oregano",
                    Title = "4 Cheeses",
                    Price = 210,
                    Weight = 500,
                    PictureFileName = "6.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, ham, olives, tomatoes, parsley, mushrooms, oregano, tomato sauce",
                    Title = "Pizza with ham and mushrooms",
                    Price = 350,
                    Weight = 900,
                    PictureFileName = "7.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, hunting sausages, bacon, boiled pork, blue onion, tomato sauce, parsley, oregano",
                    Title = "Pizza Boom of meat",
                    Price = 315,
                    Weight = 850,
                    PictureFileName = "8.png"
                },
                new CatalogEntity
                {
                    Description = "Veal sous-vide, salami, hunting sausages, chicken fillet, Dorblu cheese, parmesan, mozzarella, hard cheese, oregano, tomato sauce",
                    Title = "4 Meats",
                    Price = 255,
                    Weight = 550,
                    PictureFileName = "9.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, salmon, mussels, squid, tomato, lemon, pesto, oregano, tomato sauce",
                    Title = "Seafood",
                    Price = 230,
                    Weight = 550,
                    PictureFileName = "10.png"
                },
            };
        }

        private static IEnumerable<RoleEntity> GetPreconfiguredRoles()
        {
            return new List<RoleEntity>()
            {
                new RoleEntity()
                {
                    Name = "admin"
                },
                new RoleEntity()
                {
                    Name = "user"
                },
            };
        }

        private static IEnumerable<UserEntity> GetPreconfiguredRolesAndUsers()
        {
            return new List<UserEntity>()
            {
                new UserEntity()
                {
                    Name = "Dima",
                    LastName = "admin",
                    Email = "admin@gmail.com",
                    Password = HashPasswordService.HashPassword("admin1234"),
                    PhoneNumber = "1234567890",
                },
            };
        }
    }
}
