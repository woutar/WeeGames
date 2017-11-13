using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WeeGames.Models
{
public class GameContext : DbContext {
        public DbSet<Game> Games {get; set;}

        public GameContext(DbContextOptions<GameContext> options)
        :base(options)
        {}
    }

    public class Game{
        public int Id {get;set;}
        public string Title {get;set;}
        public string Genre {get;set;}
        public int Price {get;set;}
        public string Platform {get;set;}
        public string Description {get;set;}
    }
}

