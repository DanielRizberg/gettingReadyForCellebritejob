using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using playGroundWPF.Interfaces;
using playGroundWPF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace playGroundWPF.services
{
    public class movieService:IMovieService
    {
        public  async Task<List<movie>> searchMovies(string query)
        {
            List<movie> retVal = new List<movie>();
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/{query}"),
                Headers =
                     {
                      { "x-rapidapi-host", "imdb-internet-movie-database-unofficial.p.rapidapi.com" },
                      { "x-rapidapi-key", "a5abc19a4bmsh6004678e99f8413p1a46a7jsn35b65af042e1" },
                     },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();

                var jsonObj = JsonConvert.DeserializeObject<movieResultObject>(body);
                retVal = jsonObj?.titles ;
            }

            return retVal;
        }
    }
}
