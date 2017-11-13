using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WeeGames.Models
{
public class GameContext : DbContext {
        public DbSet<Game> Games {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Platform> Platforms {get; set;}

        public GameContext(DbContextOptions<GameContext> options)
        :base(options)
        {}
    }

    public class Game{
        public int Id {get;set;}
        public string Title {get;set;}
        public Category Category {get;set;}
        public int Price {get;set;}
        public Platform Platform {get;set;}
        public string Description {get;set;}
    }

    public class Category{
        public int Id {get;set;}
        public string Name {get;set;}
    }

    public class Platform{
        public int Id {get;set;}
        public string Name {get;set;}
    }
}

