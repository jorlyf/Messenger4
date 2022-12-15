using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Services.Dialog;
using api.Entities.DTOs.Dialog;
using api.Infrastructure.Utils;

namespace api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class DialogController : ControllerBase
	{
		private GetDialogService GetDialogService { get; }
		public DialogController(GetDialogService getDialogService)
		{
			this.GetDialogService = getDialogService;
		}

		[HttpGet]
		[Route("GetPrivateDialogById")]
		public async Task<ActionResult<PrivateDialogDTO?>> GetPrivateDialogDTOByIdAsync(int id)
		{
			try
			{
				PrivateDialogDTO? dto = await this.GetDialogService.GetPrivateDialogDTOByIdAsync(id);

				if (dto?.FirstUserId != id && dto?.SecondUserId != id) return StatusCode(400); // нельзя значит

				return Ok(dto);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}

		[HttpGet]
		[Route("GetGroupDialogById")]
		public async Task<ActionResult<GroupDialogDTO?>> GetGroupDialogDTOByIdAsync(int id)
		{
			try
			{
				GroupDialogDTO? dto = await this.GetDialogService.GetGroupDialogDTOByIdAsync(id);

				if (dto != null && !dto.UserIds.Any(userId => userId == id)) return StatusCode(400); // нельзя значит

				return Ok(dto);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}

		[HttpGet]
		[Route("GetMyPrivateDialogs")]
		public async Task<ActionResult<IEnumerable<PrivateDialogDTO>>> GetMyPrivateDialogDTOs()
		{
			try
			{
				int userId = IdentityUtils.GetAuthorizedUserId(this.User);
				IEnumerable<PrivateDialogDTO> dtos = await this.GetDialogService.GetPrivateDialogDTOsByUserIdAsync(userId);
				return Ok(dtos);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}

		[HttpGet]
		[Route("GetMyGroupDialogs")]
		public async Task<ActionResult<IEnumerable<GroupDialogDTO>>> GetMyGroupDialogDTOs()
		{
			try
			{
				int userId = IdentityUtils.GetAuthorizedUserId(this.User);
				IEnumerable<GroupDialogDTO> dtos = await this.GetDialogService.GetGroupDialogDTOsByUserIdAsync(userId);
				return Ok(dtos);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
