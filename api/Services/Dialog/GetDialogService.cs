using Microsoft.EntityFrameworkCore;
using api.Repositories;
using api.Entities.DTOs.Dialog;
using api.Entities.Db.Dialog;

namespace api.Services.Dialog
{
	public class GetDialogService
	{
		private UnitOfWork UoW { get; }

		public GetDialogService(UnitOfWork uow)
		{
			this.UoW = uow;
		}

		public async Task<PrivateDialogDTO?> GetPrivateDialogDTOByIdAsync(int id)
		{
			PrivateDialogModel? dialog = await this.UoW.PrivateDialogRepository
				.GetById(id)
				.FirstOrDefaultAsync();

			if (dialog == null) return null;

			return new PrivateDialogDTO
			{
				Id = dialog.Id,
				FirstUserId = dialog.FirstUserId,
				SecondUserId = dialog.SecondUserId,
				CreatedTimestamp = dialog.CreatedTimestamp,
				LastUpdatedTimestamp = dialog.LastUpdatedTimestamp
			};
		}

		public async Task<GroupDialogDTO?> GetGroupDialogDTOByIdAsync(int id)
		{
			GroupDialogModel? dialog = await this.UoW.GroupDialogRepository
				.GetById(id)
				.FirstOrDefaultAsync();

			if (dialog == null) return null;

			return new GroupDialogDTO
			{
				Id = dialog.Id,
				UserIds = dialog.UserIds.Select(x => x.UserId),
				Name = dialog.Name,
				CreatedTimestamp = dialog.CreatedTimestamp,
				LastUpdatedTimestamp = dialog.LastUpdatedTimestamp
			};
		}

		public async Task<PrivateDialogDTO?> GetPrivateDialogDTOByUserIdsAsync(int requesterUserId, int requestedserId)
		{
			PrivateDialogModel? dialog = await this.UoW.PrivateDialogRepository
				.GetByUserIds(requesterUserId, requestedserId)
				.FirstOrDefaultAsync();

			if (dialog == null) return null;

			return new PrivateDialogDTO
			{
				Id = dialog.Id,
				FirstUserId = dialog.FirstUserId,
				SecondUserId = dialog.SecondUserId,
				CreatedTimestamp = dialog.CreatedTimestamp,
				LastUpdatedTimestamp = dialog.LastUpdatedTimestamp
			};
		}

		public async Task<IEnumerable<PrivateDialogDTO>> GetPrivateDialogDTOsByUserIdAsync(int userId)
		{
			IEnumerable<PrivateDialogModel> dialogs = await this.UoW.PrivateDialogRepository
				.GetByUserId(userId)
				.ToListAsync();

			return dialogs.Select(dialog => new PrivateDialogDTO
			{
				Id = dialog.Id,
				FirstUserId = dialog.FirstUserId,
				SecondUserId = dialog.SecondUserId,
				CreatedTimestamp = dialog.CreatedTimestamp,
				LastUpdatedTimestamp = dialog.LastUpdatedTimestamp
			});
		}

		public async Task<IEnumerable<GroupDialogDTO>> GetGroupDialogDTOsByUserIdAsync(int userId)
		{
			IEnumerable<GroupDialogModel> dialogs = await this.UoW.GroupDialogRepository
				.GetByUserId(userId)
				.ToListAsync();

			return dialogs.Select(dialog => new GroupDialogDTO
			{
				Id = dialog.Id,
				UserIds = dialog.UserIds.Select(x => x.UserId),
				Name = dialog.Name,
				CreatedTimestamp = dialog.CreatedTimestamp,
				LastUpdatedTimestamp = dialog.LastUpdatedTimestamp
			});
		}
	}
}
