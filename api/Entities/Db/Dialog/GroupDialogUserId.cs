using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.Dialog
{
	public class GroupDialogUserId : IEntity
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int UserId { get; set; }
	}
}
