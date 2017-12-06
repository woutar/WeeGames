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
    public class UserController : Controller
    {
        
        private GameContext _context;

        public UserController(GameContext context)
        {
            _context = context;

        }

        [HttpGet("GetAll")]
        public User[] GetAll(){
            return _context.Users.ToArray();
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody]JObject value)
        {
            User posted = value.ToObject<User>(); 
            var user = from u in _context.Users
                where (u.Email.ToLower() == posted.Email.ToLower()) && (u.Password == posted.Password)
                select u;
            var correct_user = user.FirstOrDefault();
            if(correct_user == null) return NotFound();
            return Ok(correct_user);
        }
        
        [HttpPost("Register")]
        public User Register([FromBody]JObject value)
        {
            User posted = value.ToObject<User>(); 
            _context.Users.Add(posted);
            _context.SaveChanges();

            return posted;
        }      


        // [ValidateAntiForgeryToken]
        // [Bind("Email,Password,Firstname,Lastname,Birthdate,Address,Zipcode,Country,Role")] User user)
        //if (ModelState.IsValid)

    }
}
