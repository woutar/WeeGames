using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;

namespace WeeGames.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private GameContext _context;

        public SearchController(GameContext context)
        {
            _context = context;

        }

        [HttpGet("SearchGame/{searchString}")]
        public Game[] GetGames(string searchString){

            var games = from g in _context.Games
            where g.Title.ToLower().Contains(searchString.ToLower())
                let category = _context.Categories.Where(c => c.Id == g.Category.Id)
                let platform = _context.Platforms.Where(p => p.Id == g.PlatformId)
                select new Game(){Id=g.Id, Title = g.Title, Category = category.FirstOrDefault(), Price = g.Price, Platform = platform.FirstOrDefault(), Description = g.Description, Publisher = g.Publisher, Releasedate = g.Releasedate, Image = g.Image};

            return games.ToArray();
        }
    }
}
