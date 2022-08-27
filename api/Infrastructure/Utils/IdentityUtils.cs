using System.Security.Claims;

namespace api.Infrastructure.Utils
{
	public static class IdentityUtils
	{
		public static int GetAuthorizedUserId(ClaimsPrincipal user)
		{
			return int.Parse(user.Claims.First(x => x.Type == "id").Value);
		}
	}
}
