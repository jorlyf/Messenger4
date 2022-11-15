using api.Entities.Db.Message;
using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.Dialog
{
	public class DialogMessage : IEntity
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public MessageModel Message { get; set; }
	}
}
