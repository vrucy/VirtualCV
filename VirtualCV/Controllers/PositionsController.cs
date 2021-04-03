using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualCV.DataBase;
using VirtualCV.Models;

namespace VirtualCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private readonly CVdbContext _context;

        public PositionsController(CVdbContext context)
        {
            _context = context;
        }

        // GET: api/Positions
        [HttpGet]
        public IEnumerable<Position> GetPostions()
        {
            return _context.Postions;
        }

        // PUT: api/Positions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosition([FromRoute] int id, [FromBody] Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != position.Id)
            {
                return BadRequest();
            }

            _context.Entry(position).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PositionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Positions
        [HttpPost]
        public async Task<IActionResult> PostPosition([FromBody] Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Postions.Add(position);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosition", new { id = position.Id }, position);
        }


        private bool PositionExists(int id)
        {
            return _context.Postions.Any(e => e.Id == id);
        }
    }
}