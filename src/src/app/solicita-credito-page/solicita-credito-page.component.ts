import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ClienteResponse } from '../models/clienteResponse.interface';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-solicita-credito-page',
  templateUrl: './solicita-credito-page.component.html',
  styleUrls: ['./solicita-credito-page.component.css']
})
export class SolicitaCreditoPageComponent implements OnInit {

  private paso: Boolean = false; // false: pagina1 == true: pagina2

  constructor(private renderer: Renderer2, private http:HttpClient, private clientesService:ClientesService) { 
  }
  
  ngOnInit(): void {
    const gotHijos = document.querySelector('#gotHijos');
    const filePicker = <HTMLInputElement>document.querySelector('#image-picker');
    const imageInput = <HTMLInputElement>document.querySelector('#image-input');
    this.renderer.listen(filePicker, 'change', (event) => {
      const imagen = event.target.files[0];
      /**
       *  Cloudinary data
       */
      const cloudPreset = 'phwzqylx';
      const cloudUrl = 'https://api.cloudinary.com/v1_1/dlds4xwpk/upload';
      const formData = new FormData();
      formData.append('upload_preset', cloudPreset);
      formData.append('file', imagen);
      imageInput.src = '../../assets/loading.gif';
      this.http.post(cloudUrl, formData).subscribe( (response: any) => {
        console.log(response);
        imageInput.src = response.secure_url;
      })
    });

    this.renderer.listen(gotHijos, 'change', (event) => {
      console.warn((event.target.value == "true") ? 'Tiene Hijos...' : 'No tiene hijos');
      let cantHijosSelector = document.querySelector('.cantidad-hijos');
      this.renderer.setStyle(cantHijosSelector, 'display', `${(event.target.value == "true") ? 'block' : 'none'}`);
    });
  }

  mostrarSeleccionImagen(mostrar: Boolean): void{
    const subidaImagenSection = document.querySelector('.subida-imagen');
    const formulario = document.querySelector('.formulario');
    this.renderer.setStyle(subidaImagenSection, 'display', `${(mostrar ? 'flex' : 'none')}`);
    this.renderer.setStyle(formulario, 'animation', `${(mostrar ? 'grow1 1.5s forwards' : 'grow0 1.5s forwards')}`)
    this.paso = mostrar;
  }

  mostrarFormHijos(mostrar: Boolean): void{
    const hijosForm = document.querySelectorAll('.form-hijo');
    hijosForm.forEach(element => {
      this.renderer.setStyle(element, 'display', `${(mostrar ? 'flex' : 'none')}`);
    });
    this.mostrarSeleccionImagen(!mostrar);
  }

  seleccionarImagen(): void{
    const filePicker = <HTMLInputElement>document.getElementById('image-picker');
    filePicker.click();
  }

  validateDate(date: string): Boolean{
    let isValidDate = Date.parse(date);

    if (isNaN(isValidDate)) {
      return false;
    }
    return true;
  }

  calcularEdad(fechaNacimiento: Date) { 
    var diff_ms = Date.now() - fechaNacimiento.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

  async continuarToStepTwo(){
    const nombre = <HTMLInputElement>document.getElementById('nombreCompleto');
    const fechaNacimiento = <HTMLInputElement>document.getElementById('fechaNacimiento');
    const domicilio = <HTMLInputElement>document.getElementById('domicilio');
    const curp = <HTMLInputElement>document.getElementById('curp');
    const ingresosMensuales = <HTMLInputElement>document.getElementById('ingresosMensuales');
    
    if(nombre.value.length < 5){
      alert('El nombre debe tener al menos 5 caracteres de longitud.');
      return;
    }

    if(!this.validateDate(fechaNacimiento.value)){
      alert('La fecha introducida no es valida.');
      return;
    }

    if(domicilio.value.length < 5){
      alert('El domicilio debe tener al menos 5 caracteres de longitud.');
      return;
    }

    if(curp.value.length < 17){
      alert('CURP invalida.');
      return;
    }

    if(ingresosMensuales.value.length < 1){
      alert('Ingreso mensual invalido, debe ser mayor a $1.00 MXN');
      return;
    }

    const ingresos = Number.parseFloat(ingresosMensuales.value);
    if(ingresos < 1){
      alert('Ingreso mensual invalido, debe ser mayor a $1.00 MXN');
      return;
    }

    // Esconder hijos y mostrar subida de imagen.
    if(!this.paso){
      console.warn('Pasando al paso de registro #2');
      this.mostrarFormHijos(false);
      return;
    }
    console.warn('Enviando informacion a la API.');
    if(this.calcularEdad(new Date(fechaNacimiento.value)) < 18){
      alert('Eres menor de edad, no puede proceder.');
      return;
    }

    const imagenPerfil = <HTMLImageElement>document.querySelector('#image-input');
    const estadoCivil = <HTMLSelectElement>document.querySelector('#estado-civil-selector');
    const tieneHijos = (<HTMLSelectElement>document.querySelector('#gotHijos'));
    const cantHijos = (<HTMLSelectElement>document.querySelector('#cantHijos'));
    const tieneHijosResponse = tieneHijos.options[tieneHijos.selectedIndex].value;

    // Generar hijos ficticios [testing]
    let hijosList = new Array<Object>();
    if(tieneHijosResponse == "true"){
      let hijos = Number.parseInt(cantHijos.options[cantHijos.selectedIndex].value);
      for (let i = 0; i < hijos; i++) {
        hijosList.push(new Object({
          NombreCompleto: `Hijo #${i} `,
          FechaNacimiento: "03-13-2021",
          Edad: 15,
          Trabaja: false
        }));
      }
    }
    
    // Peticion
    const response = await this.clientesService.CrearNuevoCLiente(new Object({
        nombreCompleto: nombre.value.trim(),
        fechaNacimiento: fechaNacimiento.value,
        domicilio: domicilio.value.trim(),
        curp: curp.value.trim(),
        ingresosMensuales: Number.parseFloat(ingresosMensuales.value),
        urlImagen: imagenPerfil.src,
        edad: this.calcularEdad(new Date(fechaNacimiento.value)),
        idEstadoCivil: Number.parseInt(estadoCivil.options[estadoCivil.selectedIndex].value),
        hijos: hijosList
      }));
      console.log(response[0]);
      console.log(response[1]);
      console.log(response[2]);
  }

}
