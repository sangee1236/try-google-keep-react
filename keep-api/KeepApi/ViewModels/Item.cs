namespace KeepApi.ViewModels
{
    public class Item
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public string Status { get; set; }
    }
}
