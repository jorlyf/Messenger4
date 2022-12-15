using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Services.Auth;
using Microsoft.Extensions.Primitives;
using api.Infrastructure.Exceptions.Auth;
using api.Entities.DTOs.Auth;

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
		[Route("TokenLogin")]
		public ActionResult<LoginAnswer> LoginByTokenAsync()
		{
			this.Request.Headers.TryGetValue("Authorization", out StringValues token);
			LoginAnswer answer = new() { Token = token.ToString()[7..] };
			return Ok(answer);
		}

		[HttpPost]
		[Route("")]
		public async Task<ActionResult<LoginAnswer>> LoginAsync([FromBody] LoginData loginData)
		{
			try
			{
				string token = await this.LoginService.LoginAsync(loginData.Login, loginData.Password);
				LoginAnswer answer = new() { Token = token };
				return Ok(answer);
			}
			catch (AuthException ex)
			{
				return BadRequest(ex.Reason);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
