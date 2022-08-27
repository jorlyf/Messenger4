using api.DbContexts;
using api.Entities.Db.Dialog;

namespace api.Repositories
{
	public class PrivateDialogRepository : Repository<PrivateDialogModel>
	{
		public PrivateDialogRepository(DataContext context) : base(context) { }


		public IQueryable<PrivateDialogModel> GetByUserIds(int firstUserId, int secondUserId)
		{
			return this.Set.Where(dialog =>
				(dialog.FirstUserId == firstUserId || dialog.FirstUserId == secondUserId)
				&&
				(dialog.SecondUserId == firstUserId || dialog.SecondUserId == secondUserId));
		}

		public IQueryable<PrivateDialogModel> GetByUserId(int userId)
		{
			return this.Set.Where(dialog => dialog.FirstUserId == userId || dialog.SecondUserId == userId);
		}
	}
}
