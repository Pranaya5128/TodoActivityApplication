using Microsoft.EntityFrameworkCore;
using TodoAppAPI.Models;

namespace TodoAppAPI.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options)
            : base(options)
        {
        }

        public DbSet<TodoModel> TodoModel { get; set; } = default!;
    }
}
