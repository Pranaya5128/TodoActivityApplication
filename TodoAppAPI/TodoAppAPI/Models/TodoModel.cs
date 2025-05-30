namespace TodoAppAPI.Models
{
    public class TodoModel
    {
        public int Id { get; set; }
        public string TodoActivity { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
