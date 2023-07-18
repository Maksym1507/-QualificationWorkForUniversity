using Microsoft.EntityFrameworkCore;
using IdentityServer.Data;
using IdentityServer4.Services;
using IdentityServer.Services;
using IdentityServer.Repositories.Abstractions;
using IdentityServer.Repositories;
using Infrastructure.Services.Abstractions;
using Infrastructure.Services;

namespace IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddDbContextFactory<ApplicationDbContext>(opts => opts.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IDbContextWrapper<ApplicationDbContext>, DbContextWrapper<ApplicationDbContext>>();

            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryApiResources(Configurations.Apis)
                .AddInMemoryClients(Configurations.Clients)
                .AddResourceOwnerValidator<UserPasswordValidator>()
                .AddProfileService<ProfileService>()
                .AddInMemoryIdentityResources(Configurations.IdentityResources());

            services.AddSingleton<ICorsPolicyService>((container) =>
            {
                var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
                return new DefaultCorsPolicyService(logger)
                {
                    AllowAll = true
                };
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();

            app.UseIdentityServer();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());
        }
    }
}
