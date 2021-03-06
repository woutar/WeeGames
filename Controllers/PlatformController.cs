using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;

namespace WeeGames.Controllers
{
    [Route("api/[controller]")]
    public class PlatformController : Controller
    {
        private GameContext _context;

        public PlatformController(GameContext context)
        {
            _context = context; 
        }

        [HttpGet("GetAll")]
        public Platform[] GetAll(){
            return _context.Platforms.ToArray();
        }

        [HttpGet("GetPlatform/{id}")]
        public IActionResult GetPlatform(int id){
            var platforms = from p in _context.Platforms
                where p.Id == id
                select p;
            var platform = platforms.FirstOrDefault();
            if(platform == null) return NotFound();
            return Ok(platform);
        }

        [HttpGet("GetGames/{PlatformName}")]
        public Game[] GetGames(string PlatformName){
            
            
            var games = from g in _context.Games
                let platformID = _context.Platforms.Where(p => p.Name == PlatformName).FirstOrDefault()
                where g.Platform.Id == platformID.Id
                let category = _context.Categories.Where(c => c.Id == g.Category.Id)
                let platform = _context.Platforms.Where(p => p.Id == g.Platform.Id)
                select new Game(){Id=g.Id, Title = g.Title, Category = category.FirstOrDefault(), Price = g.Price, Platform = platform.FirstOrDefault(), Description = g.Description, Publisher = g.Publisher, Releasedate = g.Releasedate, Image = g.Image};

            var games_result = games.ToArray();
            return games_result;
        }
    }
}
