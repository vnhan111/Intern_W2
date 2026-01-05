namespace WbsApi.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest dto);
    Task<string> RegisterAsync(RegisterRequest dto);
}