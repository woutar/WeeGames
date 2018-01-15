using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeeGames.Models
{
public class GameContext : DbContext {
        public DbSet<Game> Games {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Platform> Platforms {get; set;}
        public DbSet<Order> Orders {get; set;}
        public DbSet<OrderItem> OrderItems {get; set;}
        public DbSet<Wishlist> Wishlists {get; set;}
        public DbSet<User> Users {get; set;}

        public GameContext(DbContextOptions<GameContext> options)
        :base(options)
        {}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }

    public class Game{
        public int Id {get;set;}
        public string Title {get;set;}
        public double Price {get;set;}
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
    }

    public class Platform{
        public int Id {get;set;}
        public string Name {get;set;}
    }

    public class Order{
        public int Id {get;set;}
        public int? UserId {get;set;}
        public DateTime OrderDate {get;set;}
        public string PaymentMethod {get; set;}
        public string MethodInfo {get; set;}
        public string Status {get; set;}
        public List<OrderItem> OrderItems {get;set;}
        public double Total {get;set;}
    }

    public class OrderItem{
        public int Id {get;set;}
        public int GameId {get;set;}
        public Game Game {get;set;}
        public int OrderId {get;set;}
        public Order Order {get;set;}
        public int Quantity {get;set;}
    }

    public class Wishlist{
        public int Id {get;set;}
        public int UserId {get;set;}
        public User User {get;set;}
        public int GameId {get;set;}
        public Game Game {get;set;}
    }

    public class User{
        public int Id {get;set;}
        [Required]
        public string Email {get;set;}
        [Required]
        public string Password {get;set;}
        [Required]
        public string Firstname {get;set;}
        [Required]
        public string Lastname {get;set;}
        [Required]
        public DateTime Birthdate {get;set;}
        [Required]
        public string Address {get;set;}
        [Required]
        public string City {get;set;}
        [Required]
        public string Zipcode {get;set;}
        [Required]
        public string Country {get;set;}
        public int Role {get;set;}
    }
}

