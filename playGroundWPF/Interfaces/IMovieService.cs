using playGroundWPF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace playGroundWPF.Interfaces
{
   public interface IMovieService
    {
        Task<List<movie>> searchMovies(string query);
    }
}
