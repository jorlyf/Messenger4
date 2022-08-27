using Microsoft.EntityFrameworkCore;
using api.DbContexts;
using api.Entities.Db.Dialog;

namespace api.Repositories
{
	public class GroupDialogRepository : Repository<GroupDialogModel>
	{
		public GroupDialogRepository(DataContext context) : base(context) { }


		public IQueryable<GroupDialogModel> GetByName(string name)
		{
			return this.Set.Where(dialog => EF.Functions.Like(dialog.Name, name));
		}

		public IQueryable<GroupDialogModel> GetByNameContains(string name)
		{
			return this.Set.Where(dialog => dialog.Name.Contains(name, StringComparison.InvariantCultureIgnoreCase));
		}

		public IQueryable<GroupDialogModel> GetByUserId(int userId)
		{
			return this.Set.Where(dialog => dialog.UserIds.Contains(userId));
		}
	}
}
