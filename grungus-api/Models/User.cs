namespace grungus_api.Models
{
    using System.ComponentModel.DataAnnotations;

        public class User
        {
            [Required]
            [MaxLength(15)]
            [MinLength(3)]
            public string Name { get; set; }

            [Required]
            [MaxLength(255)]
            [MinLength(6)]
            public string Password { get; set; }

            public string Token { get; set; }

            public User(string name, string password)
            {
                Name = name;
                Password = password;
            }

            public User(string name, string password, string token)
            {
                Name = name;
                Password = password;
                Token = token;
            }
        }
    
}
