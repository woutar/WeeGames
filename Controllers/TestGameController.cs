using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;

namespace WeeGames.Controllers
{
    [Route("api/[controller]")]
    public class TestGameController : Controller
    {
        private GameContext _context;

        public TestGameController(GameContext context)
        {
            _context = context;

            if(_context.Games.Count() == 0 ){
                
                Game g1 = new Game{
                    Title = "Call of Duty",
                    Category = 
                    new Category{Name = "Actie"},
                    Price = 40,
                    Platform =
                    new Platform{Name = "Playstation 2"},
                    Description = "Geweldig schietspel blablabla...." 
                };
                Game g2 = new Game{
                    Title = "Destiny",
                    Category = 
                    new Category{Name = "Avontuur"},
                    Price = 60,
                    Platform =
                    new Platform{Name = "Playstation 4"},
                    Description = "Destiny is een erg cool spel etc..." 
                };
                Game g3 = new Game{
                    Title = "World of Warcraft",
                    Category = 
                    new Category{Name = "RPG"},
                    Price = 20,
                    Platform =
                    new Platform{Name = "PC"},
                    Description = "Online rollenspel met stierenmannen etc..." 
                };
                _context.Games.Add(g1);
                _context.Games.Add(g2);
                _context.Games.Add(g3);
                _context.SaveChanges();
            }  
        }

        [HttpGet("GetAll")]
        public Game[] GetAll(){
            return _context.Games.ToArray();
        }

        [HttpGet("GetGame{id}")]
        public IActionResult GetGame(int id){
            var games = from g in _context.Games
                where g.Id == id
                select g;
            var game = games.FirstOrDefault();
            if(game == null) return NotFound();
            return Ok(game);
        }

    }
}
