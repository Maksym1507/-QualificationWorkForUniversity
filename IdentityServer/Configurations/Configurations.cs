using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServer
{
    public sealed class Configurations
    {
        public static IEnumerable<ApiResource> Apis => new List<ApiResource>
        {
            new ApiResource("api", "My_Api_Client", new List<string> { ClaimTypes.Role })
        };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    AllowedCorsOrigins = { "http://localhost:5000" },
                    AccessTokenLifetime = 1800,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientId = "swagger_login",
                    ClientSecrets = { new Secret("swagger_pass".Sha256()) },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId
                    },

                    AlwaysIncludeUserClaimsInIdToken = true,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    AlwaysSendClientClaims = true,
                    ClientClaimsPrefix = string.Empty
                },
                new Client
                {
                    AccessTokenLifetime = 1800,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientId = "react_client",
                    ClientSecrets = { new Secret("secret_1".Sha256()) },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId
                    },

                    AlwaysIncludeUserClaimsInIdToken = true,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    AlwaysSendClientClaims = true,
                    ClientClaimsPrefix = string.Empty
                }
            };

        public static IEnumerable<IdentityResource> IdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId()
            };
    }
}
