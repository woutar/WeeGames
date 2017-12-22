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
    public class WishListController : Controller
    {
        private GameContext _context;

        public class Checker{
            public bool status {get;set;}
        }

        public WishListController(GameContext context)
        {
            _context = context;

        }

        [HttpGet("GetWishlist/{user_id}")]
        public Wishlist[] GetWishlist(int user_id){
            var wishlist = (from wl in _context.Wishlists
                where wl.UserId == user_id
                let game = _context.Games.Where(g => g.Id == wl.Game.Id).FirstOrDefault()
                select new Wishlist(){Id = wl.Id, UserId=wl.UserId,Game = game}
            );
            return wishlist.ToArray();
        }

        [HttpPost("CheckWishlist")]
        public Checker CheckWishlist([FromBody]JObject value){
            Wishlist posted = value.ToObject<Wishlist>(); 
                var itemToCheck = (from wl in _context.Wishlists
                where wl.UserId == posted.UserId && wl.GameId ==posted.GameId
                select wl).FirstOrDefault();
            if(itemToCheck != null){
                var checker = new Checker(){status = true};
                return checker;
            }else{
                var checker = new Checker(){status = false};
                return checker;
            }
        }

        [HttpPost("AddToWishlist")]
        public void AddToWishlist([FromBody]JObject value)
        {
            Wishlist posted = value.ToObject<Wishlist>(); 

            var newWishlist = new Wishlist(){UserId=posted.UserId,GameId=posted.GameId};

            var existingWishlist = (from wl in _context.Wishlists
                where wl.UserId == posted.UserId && wl.GameId ==posted.GameId
                select wl).FirstOrDefault();
            if(existingWishlist == null){
                _context.Wishlists.Add(newWishlist);
                _context.SaveChanges();
            }
        } 

        [HttpPost("DeleteFromWishlist")]
        public void DeleteFromWishlist([FromBody]JObject value)
        {
            Wishlist posted = value.ToObject<Wishlist>();
            
            var itemToDelete = (from wl in _context.Wishlists
                where wl.UserId == posted.UserId && wl.GameId ==posted.GameId
                select wl).FirstOrDefault();

            if(itemToDelete != null){
                _context.Wishlists.Remove(itemToDelete);
                _context.SaveChanges();    
            }
            
        }      
    }
}
