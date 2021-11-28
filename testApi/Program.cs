// See https://aka.ms/new-console-template for more information
var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = HttpMethod.Get,
    RequestUri = new Uri("https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception"),
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
    Console.WriteLine(body);
}