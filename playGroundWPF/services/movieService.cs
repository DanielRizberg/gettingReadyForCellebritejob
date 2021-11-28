using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using playGroundWPF.Configuration;
using playGroundWPF.Interfaces;
using playGroundWPF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace playGroundWPF.services
{
    public class movieService:IMovieService
    {
        movieServiceConfig _config;
       
        public movieService(IOptions<movieServiceConfig> options)
        {
            _config = options.Value;
            
            
        }
        public  async Task<List<movie>> searchMovies(string query)
        {
            List<movie> retVal = new List<movie>();
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(string.Format($"{_config.moviesApiUrl}",query)),
               
                     
            };
            foreach (var item in _config.headers)
            {
                request.Headers.Add(item.Key, item.Value);
            }
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
