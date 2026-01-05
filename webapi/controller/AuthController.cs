using Microsoft.AspNetCore.Mvc;
using WbsApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace WbsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly AppDbContext _dbContext;

    public AuthController(IAuthService authService, AppDbContext dbContext)
    {
        _authService = authService;
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest registerRequest)
    {
        try
        {
            var message = await _authService.RegisterAsync(registerRequest);
            return Ok(new { Message = message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Lỗi hệ thống");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest loginRequest)
    {
        var result = await _authService.LoginAsync(loginRequest);

        if (!string.IsNullOrEmpty(result.token))
            return Ok(result);

        return Unauthorized(result.Message);
    }

    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmail(string token, string email)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email && u.EmailVerificationToken == token);

        if (user == null || user.EmailVerificationExpiry < DateTime.UtcNow)
        {
            return BadRequest("Link xác nhận không hợp lệ hoặc đã hết hạn.");
        }

        user.IsEmailVerified = true;
        user.EmailVerificationToken = null;
        user.EmailVerificationExpiry = null;
        await _dbContext.SaveChangesAsync();

        // Trả về trang thành công (hoặc redirect frontend)
        return Ok("Email đã được xác nhận thành công! Bạn có thể đăng nhập.");
    }
}