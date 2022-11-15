using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.Dialog
{
	public class GroupDialogModel : DialogModel
	{
		[Required]
		public int CreatorUserId { get; set; }

		[Required]
		public IEnumerable<GroupDialogUserId> UserIds { get; set; }

		[Required]
		public string Name { get; set; }

		public string? AvatarUrl { get; set; }
	}
}
