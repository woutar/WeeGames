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
        public Order AddOrder([FromBody]JObject value)
        {
            Order posted = value.ToObject<Order>(); 
            // // OrderItem[] orderItems = order.OrderItems.ToObject<OrderItem>();
            // foreach (OrderItem item in order.OrderItems){
            //     _context.OrderItem.Add(item);
            //     _context.SaveChanges();
            // }
            // _context.Orders.Add(order);
            // _context.SaveChanges();

            return posted;
        }      
    }
}
