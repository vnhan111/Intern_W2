using Microsoft.EntityFrameworkCore;
using WBS_backend.Data;
using WBS_backend.Entities;
using WBS_backend.DTOs.Request;
using WBS_backend.DTOs.Response;



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
    public async Task<UserResponse> RegisterAsync(RegisterRequest registerRequest)
    {
        var exists = await _context.Members.AnyAsync(m => m.Email == registerRequest.Email || m.LoginName == registerRequest.LoginName);
            if(exists)
            {
                throw new InvalidOperationException("Tài khoản hoặc email đã tồn tại");
            }
        var activationCode = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();

        var member = new Member
        {
            MemberFullName = registerRequest.MemberFullName,
            Email = registerRequest.Email,
            LoginName = registerRequest.LoginName,
            Password = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password),
            JoinDate = DateTime.UtcNow,
            IsActive = false,
            ActivatedCode = activationCode,
            RoleId = 2
        };

        _context.Members.Add(member);
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(member);

        return new UserResponse
            {
                MemberId = member.MemberId,
                MemberFullName = member.MemberFullName,
                Email = member.Email,
                LoginName = member.LoginName,
                RoleId = member.RoleId,
                IsActive = member.IsActive
        };
    }
    
    public async Task<AuthResponseDto> LoginAsync(LoginRequest loginRequest)
    {
        var member = await _context.Members.FirstOrDefaultAsync(m => m.LoginName == loginRequest.LoginName);
        if(member == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, member.Password))
        {
            return new AuthResponseDto
            {
                Success = false,
                Message = "Tên đăng nhập hoặc mật khẩu không đúng"
            };
        }
        var token = _jwtService.GenerateToken(member);

        return new AuthResponseDto
        {
            Token = token,
            Success = true,
            Message = "Đăng nhập thành công",
            Member = new UserResponse
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