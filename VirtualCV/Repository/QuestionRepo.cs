using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VirtualCV.DataBase;
using VirtualCV.Models;

namespace VirtualCV.Repository
{
    public class QuestionRepo : IQuestionRepo
    {
        private CVdbContext _context;

        public QuestionRepo(CVdbContext context)
        {
            this._context = context;
        }

        public IEnumerable<Questions> GetQuestion(int id)
        {
            return _context.Questions.Where(x => x.Id == id);
        }
    }
}
