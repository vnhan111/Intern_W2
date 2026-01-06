namespace WBS_backend.DTOs
{
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Token { get; set; }
        public MemberInfoDto? Member { get; set; }
    }

    public class MemberInfoDto
    {
        public int MemberId { get; set; }
        public string MemberFullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string LoginName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public int? RoleId { get; set; }
        public bool IsActive { get; set; }
    }
}