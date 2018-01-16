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
    public class StatisticsController : Controller
    {
        private GameContext _context;

        public StatisticsController(GameContext context)
        {
            _context = context;
        }


        [HttpGet("GetBestsellersValue")]
        public OrderItem[] GetBestsellers(){


            var orderItems =    _context.OrderItems
                            .GroupBy(p => p.GameId)
                            .Select(oi => oi.FirstOrDefault())
                            .OrderByDescending(c => c.Quantity)
                            .Take(10);

            return orderItems.ToArray();
        }

        [HttpPost("getGameTitles")]
        public string[] getGameTitles([FromBody]JArray value){
            List<string> titles = new List<string>();
            for(int i = 0; i < 10; i++){
                int gameId = value[i].ToObject<int>();
                var title = _context.Games
                            .Where(g => g.Id == gameId)
                            .Select(g => g.Title)
                            .SingleOrDefault();

                titles.Add(title);
            }
            string[] gameTitles = titles.ToArray();
            return gameTitles;
        }

    

        // [HttpGet("GetBestsellersName")]
        // public string[] GetBestsellersName(){

        //      var itemNames = _context.Games
        //                     .GroupBy(p => p.Id)
        //                         _context.OrderItems
        //                         .Select(oi => oi.FirstOrDefault())
        //                         .OrderByDescending(c => c.Quantity)
        //                         .Take(10)
        //                     .Select(g => g.Title.FirstOrDefault())
        //                     .Where(a => g.Id == oi.GameId);
                            

            // var itemNames = _context.Games
            //                 .Where(g => g.Id == amount.GameId)
            //                 .Select(gn => gn.Title.FirstOrDefault())
            //                 .Take(10);

            // return itemNames.Title.ToArray();
                
        // }
    
    }
}
