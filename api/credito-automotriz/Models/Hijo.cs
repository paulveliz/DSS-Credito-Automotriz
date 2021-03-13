using System;
using System.Collections.Generic;

#nullable disable

namespace credito_automotriz.Models
{
    public partial class Hijo
    {
        public Hijo()
        {
            EstadoCivils = new HashSet<EstadoCivil>();
        }

        public byte Id { get; set; }
        public byte CantidadIni { get; set; }
        public byte CantidadFin { get; set; }

        public virtual ICollection<EstadoCivil> EstadoCivils { get; set; }
    }
}
