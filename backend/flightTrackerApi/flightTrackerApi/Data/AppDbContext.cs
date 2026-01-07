using FlightTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FlightTrackerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<FlightView> Flights { get; set; }
        public DbSet<Airport> Airports { get; set; } 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FlightView>().HasNoKey().ToView("widok_tablica_lotow");
            modelBuilder.Entity<Airport>().HasKey(a => a.KodIata);
        }
    }
}