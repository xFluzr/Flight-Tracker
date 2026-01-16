using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightTrackerAPI.Models
{
    [Table("loty")]
    public class Flight
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("nr_lotu_oznaczenie")]
        public string NrLotu { get; set; }

        [Column("linia_kod")]
        public string LiniaKod { get; set; }

        [Column("samolot_rej")]
        public string SamolotRej { get; set; }

        [Column("lotnisko_bazowe")]
        public string LotniskoBazowe { get; set; }

        [Column("kierunek_miasto")]
        public string KierunekMiasto { get; set; }
        
        [Column("kierunek_kod")]
        public string KierunekKod { get; set; } 

        [Column("typ_operacji")]
        public string TypOperacji { get; set; }

        [Column("data_lotu")]
        public DateOnly DataLotu { get; set; }

        [Column("godzina_planowana")]
        public TimeOnly GodzinaPlanowana { get; set; }

        [Column("godzina_rzeczywista")]
        public TimeOnly? GodzinaRzeczywista { get; set; }

        [Column("status_lotu")]
        public string Status { get; set; } = "Planowy";

        [Column("opoznienie_minuty")]
        public int Opoznienie { get; set; } = 0;

        [Column("liczba_pasazerow")]
        public int LiczbaPasazerow { get; set; } = 0;
    }
}