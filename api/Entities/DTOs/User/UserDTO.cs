namespace api.Entities.DTOs.User
{
	public class UserDTO
	{
		public int Id { get; set; }

		public string Login { get; set; }

		public string? AvatarUrl { get; set; }

		public int LastActivityTimestamp { get; set; }
	}
}
