namespace api.Infrastructure.Exceptions.Auth
{
	public class AuthException : Exception
	{
		public AuthExceptionReason Reason { get; }

		public AuthException(AuthExceptionReason reason)
		{
			this.Reason = reason;
		}
	}
}
