using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualCV.Models
{
    public class Position
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Client> clients { get; set; }
        // new
        public virtual List<QuestionPosition> QuestionPositions { get; set; }

    }
}
