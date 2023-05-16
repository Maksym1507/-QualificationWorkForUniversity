using QualificationWorkForUniversity.Data.Entities;

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
        }

        private static IEnumerable<CatalogEntity> GetPreconfiguredItems()
        {
            return new List<CatalogEntity>()
            {
                new CatalogEntity
                {
                    Description = "chicken thigh, fresh cabbage, pickled cucumber, tomato, carrot, Mars onion, potato dips, shawarma sauce in lavash",
                    Title = "Hawaian",
                    Price = 260,
                    Weight = 450,
                    PictureFileName = "1.png"
                },
                new CatalogEntity
                {
                    Description = "hunting sausages, feta, olives, sriracha, mozzarella, oregano, tomato sauce",
                    Title = "Saint Diablo",
                    Price = 218,
                    Weight = 870,
                    PictureFileName = "2.png"
                },
                new CatalogEntity
                {
                    Description = "beef cutlet, pickled cucumber, onion, ketchup, American mustard, butter",
                    Title = "Hamburger",
                    Price = 315,
                    Weight = 860,
                    PictureFileName = "3.png"
                },
                new CatalogEntity
                {
                    Description = "pepperoni, hunting sausages, feta, olives, sriracha, mozzarella, oregano, tomato sauce",
                    Title = "Pepperoni",
                    Price = 335,
                    Weight = 800,
                    PictureFileName = "4.png"
                },
                new CatalogEntity
                {
                    Description = "hunting sausages, champignons, parsley, ham, sriracha, mozzarella, oregano, tomato sauce",
                    Title = "Neapolitan",
                    Price = 199,
                    Weight = 400,
                    PictureFileName = "5.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, chicken fillet, hunting sausages, champignons, parsley, ham, tomato sauce, oregano",
                    Title = "European",
                    Price = 149,
                    Weight = 550,
                    PictureFileName = "6.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, pineapple, chicken fillet, oregano, parsley, tomato sauce",
                    Title = "Mi Pizza",
                    Price = 285,
                    Weight = 900,
                    PictureFileName = "7.png"
                },
                new CatalogEntity
                {
                    Description = "Feta, mozzarella, broccoli, olives, olives, bell peppers, tomatoes, mars onion, oregano, tomato sauce",
                    Title = "Vegetarian",
                    Price = 270,
                    Weight = 550,
                    PictureFileName = "8.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, dorblu cheese, parmesan, hard cheese, bechamel sauce, oregano",
                    Title = "4 Cheeses",
                    Price = 210,
                    Weight = 500,
                    PictureFileName = "9.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, ham, olives, tomatoes, parsley, mushrooms, oregano, tomato sauce",
                    Title = "Pizza with ham and mushrooms",
                    Price = 350,
                    Weight = 900,
                    PictureFileName = "10.png"
                },
                new CatalogEntity
                {
                    Description = "ham, salami, Parmesan cheese, hard cheese, mozzarella, Dorblu cheese, mushrooms, tomatoes, Bechamel sauce, tomato sauce",
                    Title = "Double Punch",
                    Price = 220,
                    Weight = 450,
                    PictureFileName = "11.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, hunting sausages, bacon, boiled pork, blue onion, tomato sauce, parsley, oregano",
                    Title = "Pizza Boom of meat",
                    Price = 315,
                    Weight = 850,
                    PictureFileName = "12.png"
                },
                new CatalogEntity
                {
                    Description = "Veal sous-vide, salami, hunting sausages, chicken fillet, Dorblu cheese, parmesan, mozzarella, hard cheese, oregano, tomato sauce",
                    Title = "4 Meats",
                    Price = 255,
                    Weight = 550,
                    PictureFileName = "13.png"
                },
                new CatalogEntity
                {
                    Description = "mozzarella, salmon, mussels, squid, tomato, lemon, pesto, oregano, tomato sauce",
                    Title = "Seafood",
                    Price = 230,
                    Weight = 550,
                    PictureFileName = "14.png"
                },
            };
        }
    }
}
