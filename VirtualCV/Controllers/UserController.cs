using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VirtualCV.DataBase;

namespace VirtualCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CVdbContext _context;

        public UserController(CVdbContext context)
        {
            _context = context;
        }

        [Route("getUser/{UserName}/{Password}")]
        [HttpGet("{UserName}/{Password}")]
        public async Task<IActionResult> getUser([FromRoute] string userName , string Password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ok = _context.Administrators.Where(x => x.UserName == userName && x.Password == Password);
            var res = ok.Any();

            if (!ok.Any())
            {
                return NotFound();
            }

            return Ok(ok);
        }
    }
}