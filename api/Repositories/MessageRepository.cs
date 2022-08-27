using api.DbContexts;
using api.Entities.Db.Dialog;
using api.Entities.Db.Message;

namespace api.Repositories
{
	public class MessageRepository : Repository<MessageModel>
	{
		public MessageRepository(DataContext context) : base(context) { }


		public IQueryable<MessageModel> GetByDialog(int id, DialogType type)
		{
			return this.Set.Where(message => message.DialogId == id && message.DialogType == type);
		}

		public IQueryable<MessageModel> GetByTextContains(int dialogId, DialogType dialogType, string text)
		{
			return this.Set.Where(message => message.DialogId == dialogId && message.DialogType == dialogType)
				.Where(message => message.Text.Contains(text, StringComparison.InvariantCultureIgnoreCase));
		}
	}
}
