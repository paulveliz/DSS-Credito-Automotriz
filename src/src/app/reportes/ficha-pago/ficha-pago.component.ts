import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ficha-pago',
  templateUrl: './ficha-pago.component.html',
  styleUrls: ['./ficha-pago.component.css']
})
export class FichaPagoComponent implements OnInit {

  @ViewChild('fichaBody') report:ElementRef | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  descargarFicha():void{
    let content= this.report?.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element:any,renderer:any){  
        return true;  
      }  
    };
    doc.html(content.innerHTML, {
      callback: (pdf) => {
        doc.save('test.pdf'); 
      }
    });  

  }
}
