using WbsApi.Services.Interfaces;
using BCrypt.Net;

namespace WbsApi.Services;

public class AuthService : IAuthService
{
    private readonly IUserResponsitory _userRepository;
    private readonly IJwtService _jwtService;
    private readonly AppDbContext _dbContext;
    private readonly IEmailService _emailService;

    public AuthService(IUserResponsitory userRepository, IJwtService jwtService, AppDbContext dbContext, IEmailService emailService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _dbContext = dbContext;
        _emailService = emailService;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest loginRequest)
    {
        var user = await _userRepository.getUserByUserName(loginRequest.userName);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.passWord, user.Password))
        {
            return new LoginResponse
            {
                Message = "Tên đăng nhập hoặc mật khẩu không đúng"
            };
        }

        var token = _jwtService.GenerateToken(user);

        return new LoginResponse
        {
            token = token,
            userName = user.userName,
            Message = "Đăng nhập thành công",
        };
    }

    public async Task<string> RegisterAsync(RegisterRequest registerRequest)
{
    var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerRequest.passWord);

    var user = new User
    {
        userName = registerRequest.userName,
        Password = passwordHash,
        Email = registerRequest.email,
        fullName = registerRequest.fullName,
        CreatedAt = DateTime.UtcNow,
        IsActive = false,           // Chưa kích hoạt
        IsEmailVerified = false
    };

    await _userRepository.addUser(user);

    var verificationToken = Guid.NewGuid().ToString();
    user.EmailVerificationToken = verificationToken;
    user.EmailVerificationExpiry = DateTime.UtcNow.AddHours(24);
    await _dbContext.SaveChangesAsync();

    var verifyLink = $"http://localhost:3000/verify-email?token={verificationToken}&email={Uri.EscapeDataString(registerRequest.email)}";

    var emailBody = $@"
        <h2>Xin chào {registerRequest.fullName},</h2>
        <p>Cảm ơn bạn đã đăng ký WBS System.</p>
        <p>Vui lòng click vào link dưới đây để xác thực email (hiệu lực trong 24 giờ):</p>
        <p><a href='{verifyLink}' style='color:blue; font-weight:bold;'>Xác nhận email của bạn</a></p>
        <p>Nếu bạn không đăng ký, vui lòng bỏ qua email này.</p>
    ";

    try
    {
        await _emailService.sendEmailAsync(registerRequest.email, "Xác nhận email đăng ký WBS", emailBody);
        
        // CHỈ TRẢ VỀ THÀNH CÔNG KHI GỬI EMAIL OK
        return "Đăng ký thành công! Vui lòng kiểm tra email (kể cả thư rác/spam) để xác nhận tài khoản trước khi đăng nhập.";
    }
    catch (Exception ex)
    {
        // Nếu gửi email thất bại → coi như đăng ký thất bại
        Console.WriteLine($"Gửi email verify thất bại: {ex.Message}");

        // Tuỳ chọn: Xóa user vừa tạo để tránh rác database
        // _dbContext.Users.Remove(user);
        // await _dbContext.SaveChangesAsync();

        return "Đăng ký thất bại: Không thể gửi email xác nhận. Vui lòng thử lại sau hoặc liên hệ admin.";
    }
}
}