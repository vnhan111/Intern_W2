using System.ComponentModel.DataAnnotations;

namespace WBS_backend.DTOs
{
    public class RegisterDto
    {
        public string MemberFullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string LoginName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}