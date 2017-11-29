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

        [HttpGet("GetUser/{email, password}")]
        public IActionResult GetUser(string email, string password){
            var user = from u in _context.Users
                where u.Email == email && u.Password == password
                select u;
            var correct_user = user.FirstOrDefault();
            if(correct_user == null) return NotFound();
            return Ok(correct_user);
        }

        // [HttpPost]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> Create(
        // [Bind("Email,Password,Firstname,Lastname,Birthdate,Address,Zipcode,Country,Role")] User user)
        // {

        //     if (ModelState.IsValid)
        //         {
        //             _context.Add(user);
        //             await _context.SaveChangesAsync();
        //             return Ok(user);
        //         }
        //     return null;
            
        // }
        
        [HttpPost]
        public void Post([FromBody]JObject value)
        {
            User posted = value.ToObject<User>();
            // using (TomatoDb db = new TomatoDb())
            {
                _context.Users.Add(posted);
                _context.SaveChanges();
            }
        }        

    }
}
