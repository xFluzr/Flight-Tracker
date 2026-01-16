using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightTrackerAPI.Models
{
    [Table("lotniska")]
    public class Airport
    {
        [Key] 
        [Column("kod_iata")]
        public string KodIata { get; set; } // np. WAW

        [Column("nazwa")]
        public string Nazwa { get; set; }   // np. Chopin

        [Column("miasto")]
        public string Miasto { get; set; }  // np. Warszawa
    }
}