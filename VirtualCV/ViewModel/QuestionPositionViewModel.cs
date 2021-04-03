using VirtualCV.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualCV.ViewModel
{
    public class QuestionPositionViewModel
    {
        public Questions Question{ get; set; }
        public int[] PositionIds{ get; set; }
    }
}
