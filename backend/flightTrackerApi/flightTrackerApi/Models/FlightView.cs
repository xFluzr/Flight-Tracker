using System.ComponentModel.DataAnnotations.Schema;

namespace FlightTrackerAPI.Models
{
    [Table("widok_tablica_lotow")] 
    public class FlightView
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("numer_lotu")]
        public string? NumerLotu { get; set; }

        [Column("linia")]
        public string? Linia { get; set; }

        [Column("kierunek_miasto")]
        public string? Kierunek { get; set; }

        [Column("typ_operacji")]
        public string? TypOperacji { get; set; }

        [Column("data_lotu")]
        public DateOnly DataLotu { get; set; }

        [Column("godzina_planowana")]
        public TimeOnly GodzinaPlanowana { get; set; }

        [Column("godzina_rzeczywista")]
        public TimeOnly? GodzinaRzeczywista { get; set; }

        [Column("status_lotu")]
        public string? Status { get; set; }

        [Column("opoznienie_minuty")]
        public int? Opoznienie { get; set; }

        [Column("samolot_model")]
        public string? SamolotModel { get; set; }

        [Column("rejestracja")]
        public string? Rejestracja { get; set; }

        [Column("lotnisko_bazowe")]
        public string? LotniskoBazowe { get; set; }

        [Column("liczba_pasazerow")]
        public int? LiczbaPasazerow { get; set; } 

            [Column("zapelnienie_procent")]
        public decimal? Zapelnienie { get; set; }
        
        [Column("liczba_miejsc")]
        public int? LiczbaMiejsc { get; set; } // <--- Dodaj to
    }
}