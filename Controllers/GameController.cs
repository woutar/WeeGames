using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WeeGames.Controllers
{
    [Route("[controller]")]
    public class GameController : Controller
    {
        private GameContext _context;

        public GameController(GameContext context)
        {
            _context = context;

        }

        [HttpGet("GetAll")]
        public Game[] GetAll(){
            var games = from g in _context.Games
                let category = _context.Categories.Where(c => c.Id == g.Category.Id)
                let platform = _context.Platforms.Where(p => p.Id == g.PlatformId)
                select new Game(){Id=g.Id, Title = g.Title, Category = category.FirstOrDefault(), Price = g.Price, Platform = platform.FirstOrDefault(), Description = g.Description, Publisher = g.Publisher, Releasedate = g.Releasedate, Image = g.Image};
                return games.ToArray();
        }

        [HttpGet("GetGame/{id}")]
        public IActionResult GetGame(int id){
            var game = (from g in _context.Games
                where g.Id == id
                let category = _context.Categories.Where(c => c.Id == g.Category.Id).FirstOrDefault()
                let platform = _context.Platforms.Where(p => p.Id == g.PlatformId).FirstOrDefault()

                select new Game(){Id=g.Id, Title = g.Title, Category = category, Price = g.Price, Platform = platform, Description = g.Description, Releasedate = g.Releasedate, Publisher = g.Publisher, Image = g.Image}).FirstOrDefault();
            if(game == null) return NotFound();
            return Ok(game);
        }

        // [HttpDelete("DeleteGame/:id")]
        // public void DeleteGame([FromBody]JObject value)
        // {
        //     Game[] posted = value.ToObject<Game>(); 
        //     _context.Users.Add(posted);
        //     _context.SaveChanges();

        // } 

        [HttpPost("AddGame")]
        public Game AddGame([FromBody]JObject value)
        {
            var maxValue = _context.Games.Max(x => x.Id);
            Game posted = value.ToObject<Game>(); 
            posted.Id = maxValue + 1;
            _context.Games.Add(posted);
            _context.SaveChanges();

            return posted;
        }          

    }
}
