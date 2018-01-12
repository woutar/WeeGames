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
            // var amount = (from a in _context.OrderItems
            // select a.Quantity).Take(10);

            // var amount =    from a in _context.OrderItems
            //                 group a.GameId by a.Quantity into g
            //                 let sum = g.Quantity.Sum()
            //                 orderby sum descending
            //                 select new OrderItem{Id = a.GameId, Quantity = sum};

            var amount =    from a in _context.OrderItems
                            orderby a.Quantity descending
                            select new OrderItem
                            {
                                GameId = a.GameId, 
                                OrderId = a.OrderId,
                                Quantity = _context.OrderItems.Where(it => it.GameId == a.GameId).Select(it => it.Quantity).Sum()
                            };
                        return amount.ToArray();
        }
        // SELECT "GameId", SUM("Quantity") as Amount
        // FROM "OrderItems"
        // GROUP BY "GameId"
        // ORDER BY amount DESC
        // limit 10

        // [HttpGet("GetBestsellersName")]
        // public string[] GetBestsellersName(){
        //     var itemNames = from t in _context.Games
        //         let order_items = (from i in _context.OrderItems)
        // }
    
    }
}
