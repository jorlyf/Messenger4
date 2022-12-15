namespace api.Entities.DTOs.Dialog
{
	public class PrivateDialogDTO
	{
		public int Id { get; set; }

		public int FirstUserId { get; set; }

		public int SecondUserId { get; set; }

		public int CreatedTimestamp { get; set; }

		public int LastUpdatedTimestamp { get; set; }
	}
}
