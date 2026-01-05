using WBS_backend.DTOs;

namespace WBS_backend.Services;
public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    // Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    // Task<bool> ActivateMemberAsync(int activated_code);
    // Task<bool> SendActivationEmailAsync(string email);
}