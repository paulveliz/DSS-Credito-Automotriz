import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import html2pdf from 'html-to-pdfmake';
import { ReciboTemplate } from '../pdf-generador/recibo-template/index';

@Component({
  selector: 'app-pdf-generador',
  templateUrl: './pdf-generador.component.html',
  styleUrls: ['./pdf-generador.component.css']
})
export class PdfGeneradorComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {
    
  }

  public GeneratePDF():void{
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    const html = html2pdf(new ReciboTemplate().html);
    pdf.add(html);
    pdf.create().open();
    
  }

}
