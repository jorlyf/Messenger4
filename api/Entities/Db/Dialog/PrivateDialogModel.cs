using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.Dialog
{
	public class PrivateDialogModel : DialogModel
	{
		[Required]
		public int FirstUserId { get; set; }

		[Required]
		public int SecondUserId { get; set; }
	}
}
