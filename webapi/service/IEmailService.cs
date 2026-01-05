public interface IEmailService
{
    Task sendEmailAsync(string toEmail, string subject, string body);
}