namespace grungus_api.Controllers
{
    using grungus_api.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Dapper;
    using Microsoft.Data.Sqlite;

    [Route("api/[controller]")]
        [ApiController]
        public class Auth : ControllerBase
        {
            private User[] validUsers = { new User("valid", "valid", "vtoken") };

            [HttpPost("/login")]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            [ProducesResponseType(StatusCodes.Status401Unauthorized)]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            public IActionResult Login([FromBody] User user)
            {
                if (user == null)
                {
                    return BadRequest();
                }

                var _user = validUsers.FirstOrDefault(u => u.Name.Equals(user.Name) && u.Password.Equals(user.Password));
                // TODO check for valid login
                if (_user == default)
                {
                    return Unauthorized();
                }

                return NoContent();


            }

            [HttpPost("/validate")]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public IActionResult Validate([FromBody] string token)
            {
                return NotFound();
            }

        [HttpGet]
        public ActionResult<string> Get()
        {
            SQLitePCL.Batteries.Init();
            SqliteConnection connection = new SqliteConnection("Data Source=G:\\Projekte\\insiflix-backend\\insiflix-old.db");
            connection.Open();

                var command = connection.CreateCommand();
                command.CommandText =
                            @"
                    SELECT *
                    FROM Videos
                    WHERE id = $id
                ";
                command.Parameters.AddWithValue("$id", 1);


            using (var reader = command.ExecuteReader())
                {

                while (reader.Read())
                    {

                    var name = reader.GetString(1);
                        System.Console.WriteLine(name);
                    return name;
                    }
                }
            
            return Ok();
        }
        }
    
}
