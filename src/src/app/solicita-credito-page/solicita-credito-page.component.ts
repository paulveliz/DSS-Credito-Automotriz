import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-solicita-credito-page',
  templateUrl: './solicita-credito-page.component.html',
  styleUrls: ['./solicita-credito-page.component.css']
})
export class SolicitaCreditoPageComponent implements OnInit {

  

  constructor(private renderer: Renderer2, private http:HttpClient) { 
  }
  
  ngOnInit(): void {
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
  }

  mostrarSeleccionImagen(mostrar: Boolean): void{
    const subidaImagenSection = document.querySelector('.subida-imagen');
    const formulario = document.querySelector('.formulario');
    this.renderer.setStyle(subidaImagenSection, 'display', `${(mostrar ? 'flex' : 'none')}`);
    this.renderer.setStyle(formulario, 'width', `${(mostrar ? '70%' : 'min-content')}`)

    this.mostrarFormHijos(!mostrar);
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

  continuarToStepTwo(): void {
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
    this.mostrarFormHijos(false);

  }

}
