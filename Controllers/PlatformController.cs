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

            // if(_context.Platforms.Count() == 0 ){
                
            //     Platform p1 = new Platform{
            //         Name = "PC",
            //     };
            //     Platform p2 = new Platform{
            //         Name = "Playstation",
            //     };
            //     Platform p3 = new Platform{
            //         Name = "Xbox One",
            //     };
            //     Platform p4 = new Platform{
            //         Name = "Nintendo Switch",
            //     };
            //     Platform p5 = new Platform{
            //         Name = "Nintendo 3DS",
            //     };

            //     _context.Platforms.Add(p1);
            //     _context.Platforms.Add(p2);
            //     _context.Platforms.Add(p3);
            //     _context.Platforms.Add(p4);
            //     _context.Platforms.Add(p5);
            //     _context.SaveChanges();
            // }  
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

    }
}
