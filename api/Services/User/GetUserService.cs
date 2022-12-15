using Microsoft.EntityFrameworkCore;
using api.Repositories;
using api.Entities.Db.User;
using api.Entities.DTOs.User;

namespace api.Services.User
{
	public class GetUserService
	{
		private UnitOfWork UoW { get; }

		public GetUserService(UnitOfWork uow)
		{
			this.UoW = uow;
		}

		public async Task<UserDTO?> GetUserByIdAsync(int id)
		{
			UserModel? user = await this.UoW.UserRepository
				.GetById(id)
				.FirstOrDefaultAsync();

			if (user == null) return null;

			return new UserDTO
			{
				Id = user.Id,
				Login = user.Login,
				AvatarUrl = user.AvatarUrl,
				LastActivityTimestamp = user.LastActivityTimestamp
			};
		}

		public async Task<UserDTO?> GetUserDTOByLoginAsync(string login)
		{
			UserModel? user = await this.UoW.UserRepository
				.GetByLogin(login)
				.FirstOrDefaultAsync();

			if (user == null) return null;

			return new UserDTO
			{
				Id = user.Id,
				Login = user.Login,
				AvatarUrl = user.AvatarUrl,
				LastActivityTimestamp = user.LastActivityTimestamp
			};
		}

		public async Task<IEnumerable<UserDTO>> GetUserDTOsByLoginContainsAsync(string login)
		{
			IEnumerable<UserModel> users = await this.UoW.UserRepository
				.GetByLoginContains(login)
				.ToListAsync();

			return users.Select(user => new UserDTO
			{
				Id = user.Id,
				Login = user.Login,
				AvatarUrl = user.AvatarUrl,
				LastActivityTimestamp = user.LastActivityTimestamp
			});
		}
	}
}
