using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Entities.DTOs.User;
using api.Services.User;
using api.Infrastructure.Utils;
using api.Infrastructure.Exceptions.Auth;

namespace api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private GetUserService GetUserService { get; }
		public UserController(GetUserService getUserService)
		{
			this.GetUserService = getUserService;
		}

		[HttpGet]
		[Route("GetMyUser")]
		public async Task<ActionResult<UserDTO?>> GetMyUserAsync()
		{
			try
			{
				int userId = IdentityUtils.GetAuthorizedUserId(this.User);
				UserDTO? dto = await this.GetUserService.GetUserByIdAsync(userId);
				return Ok(dto);
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

		[HttpGet]
		[Route("GetUserById")]
		public async Task<ActionResult<UserDTO?>> GetUserByIdAsync(int id)
		{
			try
			{
				UserDTO? dto = await this.GetUserService.GetUserByIdAsync(id);
				return Ok(dto);
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

		[HttpGet]
		[Route("GetUserByLogin")]
		public async Task<ActionResult<UserDTO?>> GetUserDTOByLoginAsync(string login)
		{
			try
			{
				UserDTO? dto = await this.GetUserService.GetUserDTOByLoginAsync(login);
				return Ok(dto);
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

		[HttpGet]
		[Route("GetUsersByLoginContains")]
		public async Task<ActionResult<IEnumerable<UserDTO>>> GetUserDTOsByLoginContainsAsync(string login)
		{
			try
			{
				IEnumerable<UserDTO> dtos = await this.GetUserService.GetUserDTOsByLoginContainsAsync(login);
				return Ok(dtos);
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
