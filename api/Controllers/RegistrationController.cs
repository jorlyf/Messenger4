using Microsoft.AspNetCore.Mvc;
using api.Services.Auth;
using api.Infrastructure.Exceptions.Auth;
using api.Entities.DTOs.Auth;

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
		public async Task<ActionResult<LoginAnswer>> RegisterAsync([FromBody] RegistrationData registrationData)
		{
			try
			{
				string token = await this.RegistrationService.RegisterAsync(registrationData.Login, registrationData.Password);
				LoginAnswer answer = new LoginAnswer { Token = token };
				return Ok(answer);
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
