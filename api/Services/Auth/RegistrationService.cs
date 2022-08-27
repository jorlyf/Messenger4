using Microsoft.EntityFrameworkCore;
using api.Entities.Db.User;
using api.Repositories;
using api.Infrastructure.Exceptions.Auth;
using api.Infrastructure.Utils;

namespace api.Services.Auth
{
	public class RegistrationService
	{
		private UnitOfWork UoW { get; }
		private HashService HashService { get; }
		private JwtService JwtService { get; }

		public RegistrationService(UnitOfWork uow, HashService hashService, JwtService jwtService)
		{
			this.UoW = uow;
			this.HashService = hashService;
			this.JwtService = jwtService;
		}


		public async Task<string> RegistrateAsync(string login, string password)
		{
			if (await IsUserLoginExist(login))
			{
				throw new AuthException(AuthExceptionReason.UserLoginExist);
			}

			string passwordHash = this.HashService.GetHash(password);
			UserModel user = new()
			{
				Login = login,
				PasswordHash = passwordHash,
				LastActivityTimestamp = TimeUtils.GetTimestampNow()
			};

			await this.UoW.UserRepository.AddAsync(user);
			await this.UoW.UserRepository.SaveAsync();

			string token = this.JwtService.GenerateToken(user);
			return token;
		}

		private async Task<bool> IsUserLoginExist(string login)
		{
			UserModel? user = await this.UoW.UserRepository
				.GetByLogin(login)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			if (user == null) return false;
			return true;
		}
	}
}
