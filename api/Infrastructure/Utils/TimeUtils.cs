namespace api.Infrastructure.Utils
{
	public static class TimeUtils
	{
		public static int GetTimestamp(DateTime dateTime)
		{
			return (int)new DateTimeOffset(dateTime).ToUnixTimeMilliseconds();
		}

		public static int GetTimestampNow()
		{
			return (int)new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds();
		}
	}
}
