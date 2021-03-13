using System;
using System.Collections.Generic;

#nullable disable

namespace credito_automotriz.Models
{
    public partial class PlanSugerido
    {
        public byte Id { get; set; }
        public int IngresoAcumulableIni { get; set; }
        public int IngresoAcumulabeFin { get; set; }
        public byte PlanFinanciamientoSug { get; set; }

        public virtual PlanesFinanciamiento PlanFinanciamientoSugNavigation { get; set; }
    }
}
