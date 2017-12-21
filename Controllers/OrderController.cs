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
    public class OrderController : Controller
    {
        
        private GameContext _context;

        public OrderController(GameContext context)
        {
            _context = context;

        }

        [HttpGet("GetOrders/{user_id}")]
        public Order[] GetOrders(int user_id){
            var orders = from o in _context.Orders
                let order_items = (from i in _context.OrderItems 
                    let game = (from g in _context.Games
                        where g.Id == i.GameId
                        let category = _context.Categories.Where(c => c.Id == g.Category.Id).FirstOrDefault()
                        let platform = _context.Platforms.Where(p => p.Id == g.Platform.Id).FirstOrDefault()
                        select new Game(){Id=g.Id, Title = g.Title, Category = category, Price = g.Price, Platform = platform, Description = g.Description, Releasedate = g.Releasedate, Publisher = g.Publisher, Image = g.Image}
                        ).FirstOrDefault()
                    
                    where i.OrderId == o.Id
                    orderby i.Id ascending
                    select new OrderItem(){Id = i.Id,GameId = i.GameId,Game = game,OrderId = i.OrderId,Quantity = i.Quantity}
                    )

                where o.UserId == user_id
                orderby o.Id ascending
                select new Order(){Id = o.Id,UserId = o.UserId,OrderDate = o.OrderDate,PaymentMethod = o.PaymentMethod,MethodInfo = o.MethodInfo,Status = o.Status,OrderItems = order_items.ToList(),Total = o.Total};
            return orders.ToArray();
        }
        
        [HttpPost("AddOrder")]
        public void AddOrder([FromBody]JObject value)
        {
            Order posted = value.ToObject<Order>(); 

            var newOrder = new Order(){UserId=posted.UserId, OrderDate=posted.OrderDate,PaymentMethod=posted.PaymentMethod,MethodInfo=posted.MethodInfo,Status=posted.Status,Total=posted.Total};
            _context.Orders.Add(newOrder);
            _context.SaveChanges();

            foreach (OrderItem item in posted.OrderItems){
                var newOrderItem = new OrderItem(){GameId=item.GameId,OrderId=newOrder.Id,Quantity=item.Quantity};
                _context.OrderItems.Add(newOrderItem);
                _context.SaveChanges();
            }
        }      
    }
}
