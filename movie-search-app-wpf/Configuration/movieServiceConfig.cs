using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace playGroundWPF.Configuration
{
    public class movieServiceConfig
    {
       
       
        public string moviesApiUrl { get; set; }


        public string method { get; set; }


        public List<string> getParams { get; set; }

      
        public Dictionary<string,string> headers { get; set; }




    }
    
}
