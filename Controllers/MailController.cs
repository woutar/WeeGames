using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WeeGames.Mail;


namespace WeeGames.Controllers
{
    [Route("api/[controller]")]
    public class MailController : Controller
    {
        
        [HttpPost("AddOrder")]
        public void AddOrder([FromBody]JObject value)
        {
            OrderDetails details = value.ToObject<OrderDetails>();
            MailOrder.Send(details);  
        }

        [HttpPost("Register")]
        public void Register([FromBody]JObject value)
        {
            User details = value.ToObject<User>();
            MailRegister.Send(details);  
        }
    }
}