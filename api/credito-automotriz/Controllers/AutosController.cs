using credito_automotriz.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace credito_automotriz.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AutosController : ControllerBase
    {
        private automotrizContext _db;

        public AutosController(automotrizContext db)
        {
            this._db = db;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Auto>> AutosExistentes()
        {
            var autos = this._db.Autos.Take(1000).ToList();
            return autos;
        }
    }
}
