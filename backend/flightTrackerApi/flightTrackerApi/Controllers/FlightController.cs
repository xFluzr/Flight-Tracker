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
                // Obliczanie czasu lotu (planowany vs rzeczywisty)
                TimeOnly timePart = f.GodzinaRzeczywista ?? f.GodzinaPlanowana;
                DateTime flightTime = f.DataLotu.ToDateTime(timePart);

                string opType = f.TypOperacji ?? "";
                string dbStatus = f.Status ?? "Oczekuje";

                // Obliczanie dynamicznego statusu
                string dynamicStatus = CalculateStatus(opType, flightTime, now, dbStatus);

                return new FlightDto
                {
                    Id = f.Id,
                    NumerLotu = f.NumerLotu ?? "---",
                    Linia = f.Linia ?? "Nieznana",
                    KierunekMiasto = f.Kierunek ?? "Nieznany",
                    TypOperacji = opType,
                    DataLotu = f.DataLotu.ToString("yyyy-MM-dd"),
                    
                    // Formatowanie czasu do HH:mm
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

        private string CalculateStatus(string type, DateTime flightTime, DateTime now, string dbStatus)
        {
            if (dbStatus == "Odwołany") return "Odwołany";

            if (type == "odlot")
            {
                if (now > flightTime.AddMinutes(15)) return "Wystartował";
                if (now >= flightTime.AddMinutes(-40) && now <= flightTime.AddMinutes(15)) return "Boarding";
                return "Oczekuje";
            }
            else // przylot
            {
                if (now > flightTime) return "Wylądował";
                if (now >= flightTime.AddHours(-2)) return "W locie";
                return "Oczekuje";
            }
        }
    }
}