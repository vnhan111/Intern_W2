public interface IUserResponsitory
{
    Task<User?> getUserByUserName (string userName);
    Task addUser (User user);
}