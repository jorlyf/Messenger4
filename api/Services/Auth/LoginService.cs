using Microsoft.EntityFrameworkCore;
using api.Entities.Db.User;
using api.Repositories;
using api.Infrastructure.Exceptions.Auth;

namespace api.Services.Auth
{
	public class LoginService
	{
		private UnitOfWork UoW { get; }
		private HashService HashService { get; }
		private JwtService JwtService { get; }

		public LoginService(UnitOfWork uow, HashService hashService, JwtService jwtService)
		{
			this.UoW = uow;
			this.HashService = hashService;
			this.JwtService = jwtService;

		}


		public async Task<string> LoginAsync(string login, string password)
		{
			UserModel? user = await this.UoW.UserRepository
				.GetByLogin(login)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			string passwordHash = this.HashService.GetHash(password);
			if (user?.PasswordHash != passwordHash)
			{
				throw new AuthException(AuthExceptionReason.IncorrectLoginData);
			}

			string token = this.JwtService.GenerateToken(user);
			return token;
		}
	}
}
