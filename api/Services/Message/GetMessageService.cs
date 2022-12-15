using Microsoft.EntityFrameworkCore;
using api.Entities.Db.Message;
using api.Entities.DTOs.Message;
using api.Repositories;
using api.Entities.Db.Dialog;

namespace api.Services.Message
{
	public class GetMessageService
	{
		private UnitOfWork Uow { get; }
		public GetMessageService(UnitOfWork uow)
		{
			this.Uow = uow;
		}

		private AttachmentDTO AttachmentModelToDTO(AttachmentModel model) => new()
		{
			Id = model.Id,
			Type = model.Type,
			Url = model.Url
		};
		private MessageDTO MessageModelToDTO(MessageModel model) => new()
		{
			Id = model.Id,
			DialogId = model.DialogId,
			DialogType = model.DialogType,
			ReplyToMessageId = model.ReplyToMessageId,
			ReplieIds = model.Replies.Select(x => x.Id),
			SenderUserId = model.SenderUserId,
			Text = model.Text,
			Attachments = model.Attachments.Select(x => AttachmentModelToDTO(x)),
			Edited = model.Edited,
			LastEditedTimestamp = model.LastEditedTimestamp,
			SentTimestamp = model.SentTimestamp
		};

		public async Task<MessageDTO?> GetMessageByIdAsync(int id)
		{
			MessageModel? message = await this.Uow.MessageRepository
				.GetById(id)
				.Include(x => x.Replies)
				.Include(x => x.Attachments)
				.FirstOrDefaultAsync();

			if (message == null) return null;

			return MessageModelToDTO(message);
		}

		public async Task<IEnumerable<MessageDTO>> GetMessagesByDialog(int dialogId, DialogType dialogType)
		{
			IEnumerable<MessageModel> messages = await this.Uow.MessageRepository
				.GetByDialog(dialogId, dialogType)
				.Include(x => x.Replies)
				.Include(x => x.Attachments)
				.ToListAsync();

			return messages.Select(message => MessageModelToDTO(message));
		}
	}
}
