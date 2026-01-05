using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string userName { get; set; } = null!;

    [Column("password_hash")]  
    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    [Column("fullname")]  
    public string fullName { get; set; } = null!;

    [Column("created_at")]     
    public DateTime CreatedAt { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; }
    [Column("email_verification_token")]
    public string? EmailVerificationToken { get; set; }
    [Column("email_verification_expired")]
    public DateTime? EmailVerificationExpiry { get; set; }
    [Column("is_email_verify")]
    public bool IsEmailVerified { get; set; } = false;
}