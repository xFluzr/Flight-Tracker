namespace FlightTrackerAPI.Models
{
    public class FlightDto
    {
        public int Id { get; set; }
        public string NumerLotu { get; set; }
        public string Linia { get; set; }
        public string KierunekMiasto { get; set; }
        public string TypOperacji { get; set; }
        public string DataLotu { get; set; }
        public string GodzinaPlanowana { get; set; } 
        public string? GodzinaRzeczywista { get; set; } 
        public string StatusLotu { get; set; }
        public int OpoznienieMinuty { get; set; }
        public string SamolotModel { get; set; }
        public string Rejestracja { get; set; }
        public string LotniskoBazowe { get; set; }
        public int LiczbaPasazerow { get; set; } 
        public decimal Zapelnienie { get; set; }
        public int MaksMiejsc { get; set; }
        public string KodLinii { get; set; }      
        public string KodKierunku { get; set; }   
        
        public string? LiniaLogo { get; set; }      
        public string? SamolotZdjecie { get; set; } 
    }
}