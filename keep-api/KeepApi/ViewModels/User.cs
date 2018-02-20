using System.Collections.Generic;

namespace KeepApi.ViewModels
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<Label> Labels { get; set; }
        public List<List> Lists { get; set; }

    }
}
