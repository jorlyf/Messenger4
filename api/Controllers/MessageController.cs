using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Services.Message;
using api.Entities.DTOs.Message;
using api.Entities.Db.Dialog;

namespace api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class MessageController : ControllerBase
	{
		private GetMessageService GetMessageService { get; }
		public MessageController(GetMessageService getMessageService)
		{
			this.GetMessageService = getMessageService;
		}

		[HttpGet]
		[Route("GetMessagesByDialog")]
		public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageDTOsByDialogAsync(int dialogId, DialogType dialogType)
		{
			try
			{
				IEnumerable<MessageDTO> dtos = await this.GetMessageService.GetMessagesByDialog(dialogId, dialogType);
				return Ok(dtos);
			}
			catch (Exception)
			{  
				return StatusCode(500);
			}
		}
	}
}
