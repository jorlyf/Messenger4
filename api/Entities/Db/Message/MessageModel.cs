using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Entities.Db.Dialog;
using api.Entities.Db.User;

namespace api.Entities.Db.Message
{
	public class MessageModel : IEntity
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int DialogId { get; set; }

		[Required]
		public DialogType DialogType { get; set; }

		public int? ReplyToMessageId { get; set; }

		[InverseProperty("Replies")]
		public virtual MessageModel? ReplyToMessage { get; set; }

		[Required]
		public virtual IEnumerable<MessageModel> Replies { get; set; }

		[Required]
		public UserModel SenderUser { get; set; }

		[Required]
		public int SenderUserId { get; set; }

		[StringLength(maximumLength: 4096, ErrorMessage = "Message must have 0-4096 symbols length")]
		[Required(AllowEmptyStrings = true)]
		public string Text { get; set; }

		[Required]
		public IEnumerable<AttachmentModel> Attachments { get; set; }

		[Required]
		public bool Edited { get; set; }

		[Required]
		public int LastEditedTimestamp { get; set; }

		[Required]
		public int SentTimestamp { get; set; }
	}
}
