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

            
            var orderItems =
                from order in _context.OrderItems
                group order by order.GameId into orderGroup
                select new OrderItem()
                {
                    GameId = orderGroup.Key,
                    Quantity = orderGroup.Sum(x => x.Quantity),
                };
            orderItems = orderItems.OrderByDescending(c => c.Quantity);
            orderItems = orderItems.Take(10);
            
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

        [HttpPost("getRevenue")]
        public double[] getRevenue([FromBody]JArray dates){
            List<double> values = new List<double>();


            for(int i = 0; i < 9; i++){
                 var totalprice = (from o in _context.Orders
                            where (o.OrderDate >= dates[i].ToObject<DateTime>() && o.OrderDate <= dates[i + 1].ToObject<DateTime>())
                            select o.Total).Sum();
                            
                values.Add(Math.Round(totalprice, 2));
            }

            double[] revenue = values.ToArray();

            return revenue;
        }


        [HttpGet("getOrdersAmount")]
        public int[] getOrdersAmount(){
            List<int> resultArray = new List<int>();

            var ordersAmount = _context.Orders
                                .Count();

            var guestOrders = _context.Orders
                                .Where(u => u.UserId == null)
                                .Count();

            var registeredOrders = _context.Orders
                                .Where(u => u.UserId != null)
                                .Count();

            resultArray.Add(ordersAmount);
            resultArray.Add(guestOrders);
            resultArray.Add(registeredOrders);

            return resultArray.ToArray();


        }
    }
}
