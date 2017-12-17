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
    [Route("api/[controller]")]
    public class WishListController : Controller
    {
        private GameContext _context;

        public WishListController(GameContext context)
        {
            _context = context;

        }

        [HttpGet("GetAll")]
        public Game[] GetAll(){
            return _context.Games.ToArray();
        }
    }
}
