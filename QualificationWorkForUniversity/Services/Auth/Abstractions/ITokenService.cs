namespace QualificationWorkForUniversity.Services.Auth.Abstractions
{
    public interface ITokenService
    {
        Task<string> GetToken(string username, string password);
    }
}
