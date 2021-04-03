using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualCV.DataBase;
using VirtualCV.Models;

namespace VirtualCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly CVdbContext _context;

        public ClientsController(CVdbContext context)
        {
            _context = context;
        }
        
        // GET: api/Clients
        [HttpGet]
        public IEnumerable<Client> GetClients()
        {
            return _context.Clients;
        }
        
        [Route("GetClientForPosition/{idPosition}")]
        [HttpGet("{idPosition}")]
        public IEnumerable<Client> GetClientForPosition([FromRoute]int idPosition)
        {
            var clinetsForPosition = _context.Clients.Where(x => x.PositionId == idPosition);
            return clinetsForPosition;
        }
        
        [Route("GetClientId")]
        [HttpGet]
        public int GetClientId()
        {
            var clientId = _context.Clients.LastOrDefault<Client>();
            return clientId.Id;
        }

        // POST: api/Clients
        [HttpPost]
        public async Task<IActionResult> PostClient([FromBody] Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClient", new { id = client.Id }, client);
        }


        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.Id == id);
        }
    }
}