namespace KeepApi.ViewModels
{
    public class Label
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }

        //public ICollection<ListLabel> PostTags { get; } = new List<ListLabel>();

    }
}
