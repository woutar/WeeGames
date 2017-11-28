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
                select g;
                
            var games_result = games.ToArray();
            return games_result;
        }
    }
}
