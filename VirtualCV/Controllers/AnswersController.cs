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
    public class AnswersController : ControllerBase
    {
        private readonly CVdbContext _context;

        public AnswersController(CVdbContext context)
        {
            _context = context;
        }

        // GET: api/Answers
        [HttpGet]
        public IEnumerable<Answer> GetAnswers()
        {
            return _context.Answers;
        }

        [Route("PostAnswerForQuestion")]
        [HttpPost]
        public async Task<IActionResult> PostQuestionsAnswer([FromBody] IEnumerable<Answer> answer)
        {
            foreach (var item in answer)
            {
                _context.Answers.Add(item);
                await _context.SaveChangesAsync();
            }
    
            return Ok();
        }

        // POST: api/Answers
        [HttpPost]
        public async Task<IActionResult> PostAnswer([FromBody] Answer answer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnswer", new { id = answer.Id }, answer);
        }
                
        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.Id == id);
        }
        
        [Route("AnswersForQuestion/{clientId}")]
        [HttpGet("{clientId}")]
        public ActionResult<IEnumerable<Answer>> AnswersForQuestion([FromRoute] int clientId)
        {
            var questions = _context.Answers.Include(q => q.Client)
                                            .Include(y => y.Question).ThenInclude(j => j.QuestionType)
                                            .Where(a => a.ClientId == clientId).ToList();
            return questions;
        }
    }
}