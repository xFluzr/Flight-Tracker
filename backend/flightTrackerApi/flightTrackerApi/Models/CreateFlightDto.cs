namespace FlightTrackerAPI.Models
{
    public class CreateFlightDto
    {
        public string NrLotu { get; set; }
        public string LiniaKod { get; set; }     
        public string SamolotRej { get; set; }   
        public string LotniskoBazowe { get; set; } 
        public string KierunekMiasto { get; set; }
        public string KierunekKod { get; set; }
        public string TypOperacji { get; set; }  
        public DateOnly DataLotu { get; set; }
        public TimeOnly GodzinaPlanowana { get; set; }
        public int LiczbaPasazerow { get; set; }
    }
}