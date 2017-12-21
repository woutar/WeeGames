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

        [HttpGet("GetAll")]
        public Order[] GetAll(){
            return _context.Orders.ToArray();
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
