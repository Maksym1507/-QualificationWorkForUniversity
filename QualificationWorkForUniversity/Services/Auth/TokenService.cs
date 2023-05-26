using IdentityModel.Client;

namespace QualificationWorkForUniversity.Services.Auth
{
    public class TokenService : ITokenService
    {
        public async Task<string> GetToken(string username, string password)
        {
            using (var client = new HttpClient())
            {
                var discoveryDocument = await client.GetDiscoveryDocumentAsync("http://www.mi-pizza.ua:5001");
                var token = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
                {
                    Address = "http://www.mi-pizza.ua:5001/connect/token",
                    ClientId = "react_client",
                    ClientSecret = "secret_1",
                    Scope = "openid",
                    GrantType = "password",
                    UserName = username,
                    Password = password
                });

                if (token.IsError)
                {
                    throw new Exception(token.ErrorDescription);
                }

                return token.AccessToken;
            }
        }
    }
}
