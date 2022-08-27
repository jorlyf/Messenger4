using api.DbContexts;

namespace api.Repositories
{
	public class UnitOfWork : IDisposable
	{
		private DataContext Context { get; }

		public UserRepository UserRepository { get; }
		public PrivateDialogRepository PrivateDialogRepository { get; }
		public GroupDialogRepository GroupDialogRepository { get; }
		public MessageRepository MessageRepository { get; }

		public UnitOfWork(DataContext context)
		{
			this.Context = context;

			this.UserRepository = new UserRepository(this.Context);
			this.PrivateDialogRepository = new PrivateDialogRepository(this.Context);
			this.GroupDialogRepository = new GroupDialogRepository(this.Context);
			this.MessageRepository = new MessageRepository(this.Context);
		}

		public void Dispose()
		{
			this.Context.Dispose();
			GC.SuppressFinalize(this);
		}
	}
}
