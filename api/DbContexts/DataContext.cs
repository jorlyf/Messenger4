using Microsoft.EntityFrameworkCore;
using api.Entities.Db.Message;
using api.Entities.Db.User;
using api.Entities.Db.Dialog;

namespace api.DbContexts
{
	public class DataContext : DbContext
	{
		public DbSet<UserModel> Users { get; set; }
		public DbSet<MessageModel> Messages { get; set; }
		public DbSet<AttachmentModel> Attachments { get; set; }
		public DbSet<PrivateDialogModel> PrivateDialogs { get; set; }
		public DbSet<GroupDialogModel> GroupDialogs { get; set; }

		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			this.Database.EnsureCreated();
		}
	}
}
