using FlightTrackerAPI.Data;
using FlightTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace FlightTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AirportsController(AppDbContext context)
        {
            _context = context;
        }

 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airport>>> GetAirports()
        {
            
            return await _context.Airports
                .OrderBy(a => a.Miasto)
                .ToListAsync();
        }
    }
}