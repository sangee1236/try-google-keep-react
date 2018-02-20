using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KeepApi.ViewModels;

namespace KeepApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Labels")]
    public class LabelsController : Controller
    {
        private readonly KeepDbContext _context;

        public LabelsController(KeepDbContext context)
        {
            _context = context;
        }

        // GET: api/Labels
        [HttpGet]
        public IEnumerable<Label> GetLabels()
        {
            return _context.Labels;
        }

        // GET: api/Labels/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLabel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var label = await _context.Labels.SingleOrDefaultAsync(m => m.Id == id);

            if (label == null)
            {
                return NotFound();
            }

            return Ok(label);
        }

        // PUT: api/Labels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabel([FromRoute] int id, [FromBody] Label label)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != label.Id)
            {
                return BadRequest();
            }

            _context.Entry(label).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabelExists(id))
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

        // POST: api/Labels
        [HttpPost]
        public async Task<IActionResult> PostLabel([FromBody] Label label)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Labels.Add(label);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabel", new { id = label.Id }, label);
        }

        // DELETE: api/Labels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var label = await _context.Labels.SingleOrDefaultAsync(m => m.Id == id);
            if (label == null)
            {
                return NotFound();
            }

            _context.Labels.Remove(label);
            await _context.SaveChangesAsync();

            return Ok(label);
        }

        private bool LabelExists(int id)
        {
            return _context.Labels.Any(e => e.Id == id);
        }
    }
}