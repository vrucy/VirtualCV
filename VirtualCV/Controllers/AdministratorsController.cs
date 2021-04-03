using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VirtualCV.DataBase;
using VirtualCV.Models;

namespace VirtualCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorsController : ControllerBase
    {
        private readonly CVdbContext _context;

        public AdministratorsController(CVdbContext context)
        {
            _context = context;
        }

        [Route("getAdmin/{administrator}")]
        [HttpGet]
        public async Task<IActionResult> getAdmin([FromRoute] Administrator administrator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ok = _context.Administrators.Where(x => x.UserName == administrator.UserName && x.Password == administrator.Password);

            if (ok.Count() == 0)
            {
                return NotFound();
            }

            return Ok(administrator);
        }
    }
}