using FlightTrackerAPI.Data;
using FlightTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace FlightTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FlightsController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightDto>>> GetFlights(
    [FromQuery] DateOnly? date, 
    [FromQuery] string? type, 
    [FromQuery] string? airport)
{
    var query = _context.Flights.AsQueryable();

    if (date.HasValue)
        query = query.Where(f => f.DataLotu == date.Value);

    if (!string.IsNullOrEmpty(type))
        query = query.Where(f => f.TypOperacji == type);

    if (!string.IsNullOrEmpty(airport))
        query = query.Where(f => f.LotniskoBazowe == airport);

    query = query.OrderBy(f => f.GodzinaPlanowana);

    var rawFlights = await query.ToListAsync();
    var now = DateTime.Now; 

    var flightDtos = rawFlights.Select(f => 
    {
        TimeOnly timePart = f.GodzinaRzeczywista ?? f.GodzinaPlanowana;
        DateTime flightTime = f.DataLotu.ToDateTime(timePart);

        string opType = f.TypOperacji ?? "";
        string dbStatus = f.Status ?? "Oczekuje";
        string dynamicStatus = CalculateStatus(opType, flightTime, now, dbStatus);

        return new FlightDto
        {
            Id = f.Id,
            NumerLotu = f.NumerLotu ?? "---",
            Linia = f.Linia ?? "Nieznana",
            
            
            LiniaLogo = f.LiniaLogo,           
            SamolotZdjecie = f.SamolotZdjecie, 
         

            KodLinii = f.LiniaKod ?? "", 
            KodKierunku = f.KierunekKod ?? "", 
           
            KierunekMiasto = f.Kierunek ?? "Nieznany",
            TypOperacji = opType,
            DataLotu = f.DataLotu.ToString("yyyy-MM-dd"),
            GodzinaPlanowana = f.GodzinaPlanowana.ToString("HH:mm"),
            GodzinaRzeczywista = f.GodzinaRzeczywista?.ToString("HH:mm"),
            StatusLotu = dynamicStatus,
            OpoznienieMinuty = f.Opoznienie ?? 0,
            SamolotModel = f.SamolotModel ?? "Nieznany",
            Rejestracja = f.Rejestracja ?? "---",
            LotniskoBazowe = f.LotniskoBazowe ?? "",
            LiczbaPasazerow = f.LiczbaPasazerow ?? 0,
            MaksMiejsc = f.LiczbaMiejsc ?? 0,
            Zapelnienie = f.Zapelnienie ?? 0,
        };
    });

    return Ok(flightDtos);
}
        [HttpPost]
        public async Task<IActionResult> AddFlight([FromBody] CreateFlightDto dto)
        {
            try 
            {
                var newFlight = new Flight
                {
                    NrLotu = dto.NrLotu,
                    LiniaKod = dto.LiniaKod, 
                    SamolotRej = dto.SamolotRej,
                    LotniskoBazowe = dto.LotniskoBazowe,
                    KierunekMiasto = dto.KierunekMiasto,
                    KierunekKod = dto.KierunekKod, 
                    TypOperacji = dto.TypOperacji,
                    DataLotu = dto.DataLotu,
                    GodzinaPlanowana = dto.GodzinaPlanowana,
                    LiczbaPasazerow = dto.LiczbaPasazerow,
                    Status = "Planowany", 
                    Opoznienie = 0
                };

                _context.FlightTable.Add(newFlight);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Lot dodany pomyślnie!", id = newFlight.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Błąd zapisu w bazie: {ex.Message} {ex.InnerException?.Message}");
            }
        }
        
       
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFlight(int id, [FromBody] CreateFlightDto dto)
        {
            var flight = await _context.FlightTable.FindAsync(id);
            if (flight == null) return NotFound("Nie znaleziono lotu.");

            flight.NrLotu = dto.NrLotu;
            flight.LiniaKod = dto.LiniaKod; 
            flight.SamolotRej = dto.SamolotRej;
            flight.LotniskoBazowe = dto.LotniskoBazowe;
            flight.KierunekMiasto = dto.KierunekMiasto;
            flight.KierunekKod = dto.KierunekKod; 
            flight.TypOperacji = dto.TypOperacji;
            flight.DataLotu = dto.DataLotu;
            flight.GodzinaPlanowana = dto.GodzinaPlanowana;
            flight.LiczbaPasazerow = dto.LiczbaPasazerow;

            try 
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Lot zaktualizowany!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Błąd edycji w bazie: {ex.Message} {ex.InnerException?.Message}");
            }
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            var flight = await _context.FlightTable.FindAsync(id);
            if (flight == null) return NotFound("Nie znaleziono lotu.");

            try
            {
                _context.FlightTable.Remove(flight);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Lot usunięty." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Błąd usuwania: {ex.Message}");
            }
        }

        private string CalculateStatus(string type, DateTime flightTime, DateTime now, string dbStatus)
        {
            if (dbStatus == "Odwołany") return "Odwołany";

            if (type == "odlot")
            {
                if (now > flightTime.AddMinutes(15)) return "Wystartował";
                if (now >= flightTime.AddMinutes(-40) && now <= flightTime.AddMinutes(15)) return "Boarding";
                return "Oczekuje";
            }
            else 
            {
                if (now > flightTime) return "Wylądował";
                if (now >= flightTime.AddHours(-2)) return "W locie";
                return "Oczekuje";
            }
        }
    }
}