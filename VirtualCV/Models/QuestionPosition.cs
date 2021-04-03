using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualCV.Models
{
    public class QuestionPosition
    {
        
        public int QuestionId { get; set; }
        public Questions Questions { get; set; }
        
        public int PositionId { get; set; }
        public Position Positions { get; set; }
    }
}
