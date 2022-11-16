using System.ComponentModel.DataAnnotations;

namespace api.Entities.DTOs.Auth
{
	public class RegistrationData
	{
		[Required]
		public string Login { get; set; }

		[Required]
		public string Password { get; set; }
	}
}
