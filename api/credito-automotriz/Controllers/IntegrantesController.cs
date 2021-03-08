using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace credito_automotriz.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IntegrantesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> ObtenerIntegrantes()
        {
            var integrantes = new List<string> { "Paul", "Jorge" };
            return integrantes;
        }
        [HttpGet("[action]")]
        public  IActionResult CrearNuevoIntegrante()
        {
            return Ok("Se creó con exito!");
        }
    }
}
