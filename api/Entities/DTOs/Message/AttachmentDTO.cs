using api.Entities.Db.Message;

namespace api.Entities.DTOs.Message
{
	public class AttachmentDTO
	{
		public int Id { get; set; }

		public AttachmentType Type { get; set; }

		public string Url { get; set; }
	}
}
