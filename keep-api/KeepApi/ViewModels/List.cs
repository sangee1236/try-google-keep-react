using System.Collections.Generic;

namespace KeepApi.ViewModels
{
    public class List
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }

        public List<Item> Items { get; set; }
        public List<Label> Labels { get; set; }
       // public ICollection<ListLabel> PostTags { get; } = new List<ListLabel>();
    }
}
