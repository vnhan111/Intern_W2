using WBS_backend.DTOs.Request;
using WBS_backend.DTOs.Response;

namespace WBS_backend.Services;
public interface IAuthService
{
    Task<UserResponse> RegisterAsync(RegisterRequest registerRequest);
    Task<AuthResponseDto> LoginAsync(LoginRequest loginRequest);
    // Task<bool> ActivateMemberAsync(int activated_code);
    // Task<bool> SendActivationEmailAsync(string email);
}