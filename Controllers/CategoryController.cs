using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeeGames.Models;

namespace WeeGames.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private GameContext _context;

        public CategoryController(GameContext context)
        {
            _context = context;
 
        }

        [HttpGet("GetAll")]
        public Category[] GetAll(){
            return _context.Categories.ToArray();
        }

        [HttpGet("GetCategory{id}")]
        public IActionResult GetCategory(int id){
            var categories = from c in _context.Categories
                where c.Id == id
                select c;
            var category = categories.FirstOrDefault();
            if(category == null) return NotFound();
            return Ok(category);
        }

    }
}
