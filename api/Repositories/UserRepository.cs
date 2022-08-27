using Microsoft.EntityFrameworkCore;
using api.DbContexts;
using api.Entities.Db.User;

namespace api.Repositories
{
	public class UserRepository : Repository<UserModel>
	{
		public UserRepository(DataContext context) : base(context) { }


		public IQueryable<UserModel> GetByLogin(string login)
		{
			return this.Set.Where(user => EF.Functions.Like(user.Login, login));
		}

		public IQueryable<UserModel> GetByLoginContains(string login)
		{
			return this.Set.Where(user => user.Login.Contains(login, StringComparison.InvariantCultureIgnoreCase));
		}
	}
}
