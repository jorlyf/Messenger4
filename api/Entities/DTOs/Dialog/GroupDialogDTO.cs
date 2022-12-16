namespace api.Entities.DTOs.Dialog
{
	public class GroupDialogDTO
	{
		public int Id { get; set; }

		public IEnumerable<int> UserIds { get; set; }

		public string Name { get; set; }

		public string? AvatarUrl { get; set; }

		public int CreatedTimestamp { get; set; }

		public int LastUpdatedTimestamp { get; set; }
	}
}
