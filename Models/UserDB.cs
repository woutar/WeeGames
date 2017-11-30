using System;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WeeGames.Models;
 
namespace WeeGames.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
 
        public DbSet<User> Users { get; set; }

    } 
}