using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.Dialog
{
	public abstract class DialogModel : IEntity
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int CreatedTimestamp { get; set; }

		[Required]
		public int LastUpdatedTimestamp { get; set; }
	}
}
