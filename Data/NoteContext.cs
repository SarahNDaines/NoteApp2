using Microsoft.EntityFrameworkCore;
using NoteAppBackend.Models;

namespace NoteAppBackend.Data
{
    public class NoteContext : DbContext
    {
        public NoteContext(DbContextOptions<NoteContext> options) : base(options) { }

        public DbSet<Note> Notes { get; set; }
    }
}
