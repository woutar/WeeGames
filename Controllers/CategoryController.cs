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

            if(_context.Categories.Count() == 0 ){
                
                Category c1 = new Category{
                    Name = "Avontuur",
                };
                Category c2 = new Category{
                    Name = "RPG",
                };
                Category c3 = new Category{
                    Name = "Actie",
                };
                Category c4 = new Category{
                    Name = "Behendigheid",
                };
                Category c5 = new Category{
                    Name = "Puzzle",
                };

                _context.Categories.Add(c1);
                _context.Categories.Add(c2);
                _context.Categories.Add(c3);
                _context.Categories.Add(c4);
                _context.Categories.Add(c5);
                _context.SaveChanges();
            }  
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
