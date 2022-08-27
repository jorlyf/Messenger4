using Microsoft.AspNetCore.Mvc;
using api.Services.Auth;
using api.Infrastructure.Exceptions.Auth;

namespace api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RegistrationController : ControllerBase
	{
		private RegistrationService RegistrationService { get; }

		public RegistrationController(RegistrationService registrationService)
		{
			this.RegistrationService = registrationService;
		}


		[HttpPost]
		[Route("")]
		public async Task<ActionResult<string>> RegistrateAsync(string login, string password)
		{
			try
			{
				string token = await this.RegistrationService.RegistrateAsync(login, password);
				return Ok(token);
			}
			catch (AuthException ex)
			{
				return BadRequest();
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
