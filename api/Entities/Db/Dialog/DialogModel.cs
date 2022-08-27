using System.ComponentModel.DataAnnotations;
using api.Entities.Db.Message;

namespace api.Entities.Db.Dialog
{
	public abstract class DialogModel : IEntity
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public IEnumerable<MessageModel> Messages { get; set; }

		[Required]
		public int CreatedTimestamp { get; set; }

		[Required]
		public int LastUpdatedTimestamp { get; set; }
	}
}
