import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ficha-pago',
  templateUrl: './ficha-pago.component.html',
  styleUrls: ['./ficha-pago.component.css']
})
export class FichaPagoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  descargarFicha():void{

  }
}
