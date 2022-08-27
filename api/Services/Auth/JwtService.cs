using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using api.Entities.Db.User;

namespace api.Services.Auth
{
	public class JwtService
	{
		private IConfiguration Configuration { get; }
		public JwtService(IConfiguration configuration)
		{
			this.Configuration = configuration;
		}


		public string GenerateToken(UserModel user)
		{
			Claim[] claims = new[]
			{
				new Claim("id", user.Id.ToString()),
				new Claim("login", user.Login)
			};

			SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(this.Configuration["Jwt:Key"]));
			SigningCredentials signIn = new(key, SecurityAlgorithms.HmacSha256);
			JwtSecurityToken token = new(
				claims: claims,
				expires: DateTime.UtcNow.AddDays(30),
				signingCredentials: signIn);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
