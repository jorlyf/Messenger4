using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.User
{
	[Index(nameof(Login), IsUnique = true)]
	public class UserModel : IEntity
	{
		[Key]
		public int Id { get; set; }

		[StringLength(maximumLength: 16, MinimumLength = 3, ErrorMessage = "User login must have 3-16 symbols length")]
		[Required]
		public string Login { get; set; }

		[Required]
		public string PasswordHash { get; set; }

		public string? AvatarUrl { get; set; }

		[Required]
		public int LastActivityTimestamp { get; set; }
	}
}
