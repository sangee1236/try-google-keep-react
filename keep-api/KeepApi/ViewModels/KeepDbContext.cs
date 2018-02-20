using Microsoft.EntityFrameworkCore;

namespace KeepApi.ViewModels
{
    public class KeepDbContext : DbContext
    {
        public KeepDbContext(DbContextOptions<KeepDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Label> Labels { get; set; }
        // public DbSet<ListLabel> ListLabel { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<List>().ToTable("List");
            modelBuilder.Entity<Item>().ToTable("Item");
            modelBuilder.Entity<Label>().ToTable("Label");
            //modelBuilder.Entity<ListLabel>().ToTable("ListLabel");
            //modelBuilder.Entity<ListLabel>()
            //        .HasKey(t => new { t.ListId, t.LabelId });
        }
    }
}

