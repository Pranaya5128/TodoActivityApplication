using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAppAPI.Data;
using TodoAppAPI.Models;

namespace TodoAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoController(TodoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetTodos()
        {
            return await _context.TodoModel.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoModel todoModel)
        {
            _context.Add(todoModel);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id)
        {
            var todoModel = await _context.TodoModel.FindAsync(id);
            if (todoModel != null)
            {
                todoModel.IsCompleted = true;
                _context.Update(todoModel);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todoModel = await _context.TodoModel.FindAsync(id);
            if (todoModel != null)
            {
                _context.TodoModel.Remove(todoModel);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
