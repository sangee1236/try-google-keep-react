using KeepApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Lists")]
    public class ListsController : Controller
    {
        private readonly KeepDbContext _context;

        public ListsController(KeepDbContext context)
        {
            _context = context;
        }

        // GET: api/Lists
        [HttpGet]
        public IEnumerable<List> GetLists()
        {
            return _context.Lists;
        }

        // GET: api/Lists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.Lists
                .Include(r => r.Items)
                .Include(r => r.Labels)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        // GET: api/Lists/5
        [HttpGet("by-user/{uid}")]
        public async Task<IActionResult> GetAllList([FromRoute] int uid)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var lists = await _context.Lists
                .Where(m => m.UserId == uid)
                .Include(r => r.Items)
                .Include(r => r.Labels)
                .ToListAsync();

            return Ok(lists);
        }

        // PUT: api/Lists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutList([FromRoute] int id, [FromBody] List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != list.Id)
            {
                return BadRequest();
            }

            _context.Entry(list).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetList", new { id = list.Id }, list);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lists
        [HttpPost]
        public async Task<IActionResult> PostList([FromBody] List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Lists.Add(list);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetList", new { id = list.Id }, list);
        }

        // DELETE: api/Lists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.Lists.SingleOrDefaultAsync(m => m.Id == id);
            if (list == null)
            {
                return NotFound();
            }

            _context.Lists.Remove(list);
            await _context.SaveChangesAsync();

            return Ok(list);
        }

        private bool ListExists(int id)
        {
            return _context.Lists.Any(e => e.Id == id);
        }
    }
}