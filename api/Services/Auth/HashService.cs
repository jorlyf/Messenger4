using System.Security.Cryptography;
using System.Text;

namespace api.Services.Auth
{
	public class HashService
	{
		public string GetHash(string value)
		{
			byte[] hashedBuffer;
			using (SHA256 sha256 = SHA256.Create())
			{
				hashedBuffer = sha256.ComputeHash(Encoding.UTF8.GetBytes(value));
			}
			string hashed = Encoding.UTF8.GetString(hashedBuffer);
			return hashed;
		}
	}
}
