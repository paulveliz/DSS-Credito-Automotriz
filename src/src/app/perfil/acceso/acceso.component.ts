import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  constructor(
    private apiClientes:ClientesService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  loading(loading:boolean):void{
    const logInButton = <HTMLButtonElement>document.querySelector('#loginButton');
    logInButton.disabled = loading;
    logInButton.innerText = loading ? 'Iniciando sesion...' : 'Acceder';
  }

  logIn(curp:string):void{
    if(!(curp != '')){
      alert('No deje espacios vacios');
      return;
    }
    this.loading(true);
    this.apiClientes.ObtenerClientePorCurp(curp.trim())
                    .subscribe(cliente =>{
                      this.loading(false);
                      this.router.navigate([`perfil/cliente/${cliente.datos_generales.curp}`]);
                    }, err => {
                      this.loading(false);
                      alert(`El cliente con curp ${curp} no existe en el sistema.`);
                    });

  }

}
