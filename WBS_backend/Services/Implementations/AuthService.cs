using Microsoft.EntityFrameworkCore;
using WBS_backend.Data;
using WBS_backend.Entities;
using WBS_backend.DTOs;



namespace WBS_backend.Services;
public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwtService;
    public AuthService(AppDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }
    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        var exists = await _context.Members.AnyAsync(m => m.Email == registerDto.Email || m.LoginName == registerDto.LoginName);
            if(exists)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Tài khoản hoặc email đã tồn tại"
                };
            }
        var activationCode = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();

        var member = new Member
        {
            MemberFullName = registerDto.MemberFullName,
            Email = registerDto.Email,
            LoginName = registerDto.LoginName,
            Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
            JoinDate = DateTime.UtcNow,
            IsActive = false,
            ActivatedCode = activationCode,
            RoleId = 2
        };

        _context.Members.Add(member);
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(member);

        return new AuthResponseDto
        {
            Token = token,
            Success = true,
            Message = "Đăng ký thành công",
            Member = new MemberInfoDto
            {
                MemberId = member.MemberId,
                MemberFullName = member.MemberFullName,
                Email = member.Email,
                LoginName = member.LoginName,
                RoleId = member.RoleId,
                IsActive = member.IsActive
            }
        };
    }
}