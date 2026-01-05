using System.ComponentModel.DataAnnotations;

namespace WBS_backend.DTOs
{
    public class LoginDto
    {
        public string LoginName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}