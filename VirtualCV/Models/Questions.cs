using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VirtualCV.Models
{
    public class Questions
    {
        public int Id { get; set; }
        public string Question { get; set; }


        [ForeignKey("QuestionType")]
        public int QuestionTypeID { get; set; }
        public QuestionType QuestionType { get; set; }

        //[ForeignKey("PositionId")]
        //new delete
        //public int PositionId { get; set; }
        //public Position Position { get; set; }

        [ForeignKey("Component")]
        public int ComponentId { get; set; }
        public Component Component { get; set; }

        //public int AnswerId { get; set; }
        //public Answer Answer { get; set; }

        //new 
        public virtual List<QuestionPosition> QuestionPositions { get; set; }

    }
}