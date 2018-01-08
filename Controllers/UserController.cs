using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WeeGames.Mail;


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
            var users = (from u in _context.Users
            orderby u.Id ascending
            select u);
            return users.ToArray();
        }

        [HttpGet("Getuser/{id}")]
        public IActionResult GetUser(int id){
            var user = (from u in _context.Users
                where u.Id == id
                select new User(){Id=u.Id, Email=u.Email, Password=u.Password, Firstname=u.Firstname, Lastname=u.Lastname, Birthdate=u.Birthdate, Address=u.Address, Zipcode=u.Zipcode, Country=u.Country, Role=u.Role }).FirstOrDefault();
            if(user == null) return NotFound();
            return Ok(user);
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
        public IActionResult Register([FromBody]JObject value)
        {
            // var maxValue = _context.Users.Max(x => x.Id);
            User posted = value.ToObject<User>(); 
            // posted.Id = maxValue + 1;
            _context.Users.Add(posted);
            _context.SaveChanges();
            return Ok(posted);
        }      


        [HttpPost("DeleteUser")]
        public void DeleteUser([FromBody]JArray value)
        {
            JArray rows = value;
            int length = rows.Count;

            for(var i = 0; i < length; i++){
                var itemToDelete = (from u in _context.Users
                                    where u.Id == rows[i].ToObject<int>()
                                    select u).FirstOrDefault();
                if(itemToDelete != null){
                    _context.Users.Remove(itemToDelete);
                    _context.SaveChanges();    
                }
            }
        } 

        [HttpPost("UpdateUser")]
        public void UpdateUser([FromBody]JObject value)
        {
            User posted = value.ToObject<User>(); 

            var query =
                from u in _context.Users
                where u.Id == posted.Id
                select u;

            foreach (User u in query)
            {
                u.Firstname = posted.Firstname;
                u.Lastname = posted.Lastname;
                u.Email = posted.Email;
                u.Address = posted.Address;
                u.Zipcode = posted.Zipcode;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // Provide for exceptions.
            }
        }

        [HttpPost("UpdateFullUser")]
        public void UpdateFullUser([FromBody]JObject value)
        {
            User posted = value.ToObject<User>(); 

            var query =
                from u in _context.Users
                where u.Id == posted.Id
                select u;

            foreach (User u in query)
            {
                u.Firstname = posted.Firstname;
                u.Lastname = posted.Lastname;
                u.Email = posted.Email;
                u.Address = posted.Address;
                u.Zipcode = posted.Zipcode;
                u.Password = posted.Password;
                u.Birthdate = posted.Birthdate;
                u.Country = posted.Country;
                u.Role = posted.Role;

            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // Provide for exceptions.
            }
        }
    }
}
