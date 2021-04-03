using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualCV.DataBase;
using VirtualCV.Models;
using VirtualCV.Repository;
using VirtualCV.ViewModel;

namespace VirtualCV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly CVdbContext _context;

        public QuestionsController(CVdbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public IEnumerable<Questions> GetQuestions()
        {
            return _context.Questions;
        }

        // GET: api/Questions 
        [HttpGet("typeQuestions")]
        public IEnumerable<QuestionType> GetTypeQuestions()
        {
            return _context.QuestionTypes;
        }

        [HttpGet("GetTypeComponent")]
        public IEnumerable<Component> GetTypeComponent()
        {
            return _context.Components;
        }

        //[Route("GetQuestionsForPosition/{idPosition}")]
        //[HttpGet("PostionId")]
        //public IEnumerable<Questions> GetQuestionsForPosition([FromRoute] int idPosition)
        //{
            
        //    var questions = _context.Questions.Include(y => y.QuestionType)/*.Where(x => x.PositionId== idPosition)*/.ToList();
        //    var q = _context.QuestionPositions.Where(x => x.PositionId == idPosition);

        //    return questions;
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestions([FromRoute] int id, [FromBody] Questions questions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != questions.Id)
            {
                return BadRequest();
            }

            _context.Entry(questions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionsExists(id))
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

        private bool QuestionsExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }

        [Route("GetQuestionForTypeId/{id}")]
        [HttpGet("{id}")]
        public ActionResult GetQuestionForTypeId([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var questionForTypeId = _context.Questions.Where(q => q.QuestionTypeID == id);
            return Ok(questionForTypeId);
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> PostQuestions([FromBody] QuestionPositionViewModel questionPositions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var positions = _context.Postions.Where(p => questionPositions.PositionIds.Contains(p.Id)).ToList();
            _context.Questions.Add(questionPositions.Question);
            await _context.SaveChangesAsync();

            questionPositions.Question.QuestionPositions = new List<QuestionPosition>();

            var questionPositionsa = positions.Select(p => new QuestionPosition { PositionId = p.Id, QuestionId = questionPositions.Question.Id });

                questionPositions.Question.QuestionPositions.AddRange(questionPositionsa);
                await _context.SaveChangesAsync();

            return Ok();

        }
        
        [Route("PostQuestionPositions")]
        [HttpPost]
        public async Task<IActionResult> PostQuestionPositions([FromBody] QuestionPosition questionPosition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.QuestionPositions.Add(questionPosition);

            await _context.SaveChangesAsync();

            return Ok(questionPosition);
        }

        // ne znam dali pozivam provera
        [Route("getQuestionsType/{idType}")]
        [HttpGet("{idType}")]
        public ActionResult<IEnumerable<QuestionType>> getQuestionsType([FromRoute] int idType)
        {
            var qType = _context.QuestionTypes.Where(x => x.Id == idType).ToArray();

            return qType;
        }

        [Route("getQuestionsForPosition/{id}")]
        [HttpGet("{id}")]
        public IEnumerable<Questions> getQuestionForPostion([FromRoute] int id)
        {
            var questionIDsForPosition = _context.QuestionPositions.Where(p => p.PositionId == id).ToList();

            var x = questionIDsForPosition.Select(t => t.QuestionId);

            var questions = _context.Questions.Where(p => p.QuestionPositions.Any(q => x.Contains(q.QuestionId))).Include(w => w.QuestionType);

            return questions;
        }
        
        [Route("getQuestionsForType/{id}")]
        [HttpGet("{id}")]
        public IEnumerable<Questions> getQuestionsForType([FromRoute] int id)
        {
            var questions = _context.Questions.Where(x => x.QuestionTypeID == id);

            return questions;
        }
    }
}