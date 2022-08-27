using System.ComponentModel.DataAnnotations;

namespace api.Entities.Db.Message
{
	public class AttachmentModel : IEntity
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public AttachmentType Type { get; set; }

		[Required]
		public string Url { get; set; }
	}

	public enum AttachmentType
	{
		Photo,
		Video,
		File
	}
}
