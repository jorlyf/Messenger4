using api.Entities.Db.Dialog;
using api.Entities.DTOs.User;

namespace api.Entities.DTOs.Message
{
	public class MessageDTO
	{
		public int Id { get; set; }

		public int DialogId { get; set; }

		public DialogType DialogType { get; set; }

		public int? ReplyToMessageId { get; set; }

		public IEnumerable<int> ReplieIds { get; set; }

		public int SenderUserId { get; set; }

		public string Text { get; set; }

		public IEnumerable<AttachmentDTO> Attachments { get; set; }

		public bool Edited { get; set; }

		public int LastEditedTimestamp { get; set; }

		public int SentTimestamp { get; set; }
	}
}
