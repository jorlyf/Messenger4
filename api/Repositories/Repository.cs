using Microsoft.EntityFrameworkCore;
using api.DbContexts;
using api.Entities.Db;

namespace api.Repositories
{
	public abstract class Repository<T> where T : class, IEntity
	{
		public DataContext Context { get; }
		public DbSet<T> Set { get; }

		public Repository(DataContext context)
		{
			this.Context = context;
			this.Set = context.Set<T>();
		}


		public IQueryable<T> GetById(int id)
		{
			
			return this.Set.Where(x => x.Id == id);
		}
		public IQueryable<T> GetManyByIds(IEnumerable<int> ids)
		{
			return this.Set.Where(x => ids.Contains(x.Id));
		}

		public IQueryable<T> GetAll()
		{
			return this.Set;
		}

		public async Task AddAsync(T item)
		{
			await this.Set.AddAsync(item);
		}

		public void Update(T item)
		{
			this.Set.Update(item);
		}

		public void Delete(T item)
		{
			this.Set.Remove(item);
		}

		public void Attach(T item)
		{
			this.Set.Attach(item);
		}

		public Task SaveAsync()
		{
			return this.Context.SaveChangesAsync();
		}
	}
}
