using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WeeGames.Controllers
{
    [Route("api/[controller]")]
    public class TestGameController : Controller
    {
        private static string[] Game = new[]
        {
            "Diddy Kong", "Call of Duty", "Battlefield", "Destiny", "World of Warcraft", "Chicken Invaders"
        };

        private static string[] Genre = new[]
        {
            "Action", "Adventure", "MMO", "RPG", "Strategy", "Dungeon Crawler"
        };

        private static string[] Platform = new[]
        {
            "PC", "Playstation", "Xbox", "Nintendo Wii", "Nintendo Switch"
        };

        [HttpGet("[action]")]
        public IEnumerable<GameList> Gamelist()
        {
            var rng = new Random();
            return Enumerable.Range(1, 3).Select(index => new GameList
            {
                Game = Game[rng.Next(Game.Length)],
                Genre = Genre[rng.Next(Genre.Length)],
                Price = rng.Next(10, 55),
                Platform = Platform[rng.Next(Platform.Length)]
            });
        }

        //Model
        public class GameList
        {
            public string Game { get; set; }

            public string Genre { get; set; }

            public int Price { get; set; }

            public string Platform{ get; set; }

        }
    }
}
