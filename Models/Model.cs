using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WeeGames.Models
{
public class GameContext : DbContext {
        public DbSet<Game> Games {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Platform> Platforms {get; set;}
        public DbSet<Order> Orders {get; set;}
        public DbSet<OrderGames> OrderGames {get; set;}


        public GameContext(DbContextOptions<GameContext> options)
        :base(options)
        {}
    }

    public class Game{
        public int Id {get;set;}
        public string Title {get;set;}
        public int Price {get;set;}
        public string Description {get;set;}
        public int CategoryId {get;set;}   
        public Category Category {get;set;}
        public int PlatformId {get;set;}
        public Platform Platform {get;set;}
        public string Image{get;set;}
        public int Releasedate {get;set;}
        public string Publisher {get;set;}
    }

    public class Category{
        public int Id {get;set;}
        public string Name {get;set;}
        public List<Game> Games {get;set;}
    }

    public class Platform{
        public int Id {get;set;}
        public string Name {get;set;}
        public List<Game> Games {get;set;}
    }

    public class Order{
        public int Id {get;set;}
        public DateTime OrderDate {get;set;}

    }

    public class OrderGames{
        public int Id {get;set;}
        public int GameId {get;set;}
        public Game Game {get;set;}
        public int OrderId {get;set;}
        public Order Order {get;set;}
        public int Quantity {get;set;}
    }
}

