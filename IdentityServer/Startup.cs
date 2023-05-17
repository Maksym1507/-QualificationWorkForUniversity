using Microsoft.EntityFrameworkCore;
using IdentityServer.Data;

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
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryApiResources(Configurations.Apis)
                .AddInMemoryClients(Configurations.Clients)
                .AddResourceOwnerValidator<UserPasswordValidator>()
                .AddInMemoryIdentityResources(Configurations.IdentityResources());
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
