using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualCV.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string AnswerQuestion { get; set; }

        [ForeignKey("ClientId")]
        public int ClientId { get; set; }
        public Client Client{ get; set; }

        [ForeignKey("QuestionId")]
        public int? QuestionId { get; set; }
        public Questions Question { get; set; }
    }
}
