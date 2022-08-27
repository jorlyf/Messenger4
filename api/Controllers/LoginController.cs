using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Services.Auth;
using api.Infrastructure.Exceptions.Auth;

namespace api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LoginController : ControllerBase
	{
		private LoginService LoginService { get; }

		public LoginController(LoginService loginService)
		{
			this.LoginService = loginService;
		}

		[Authorize]
		[HttpPost]
		[Route("Token")]
		public ActionResult LoginByToken()
		{
			return Ok();
		}

		[HttpPost]
		[Route("")]
		public async Task<ActionResult<string>> LoginAsync([FromBody] string login, string password)
		{
			try
			{
				string token = await this.LoginService.LoginAsync(login, password);
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
