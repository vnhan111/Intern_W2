using Microsoft.EntityFrameworkCore;

public class UserResponsitory : IUserResponsitory
{
    private readonly AppDbContext dbContext;

    public UserResponsitory(AppDbContext context)
    {
        dbContext = context;
    }

    public async Task<User?> getUserByUserName(string userName)
    {
        return await dbContext.Users.FirstOrDefaultAsync(u => u.userName == userName && u.IsActive);
    }
    public async Task addUser(User user)
    {
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
    }
}