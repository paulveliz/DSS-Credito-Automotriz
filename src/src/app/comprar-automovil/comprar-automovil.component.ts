import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comprar-automovil',
  templateUrl: './comprar-automovil.component.html',
  styleUrls: ['./comprar-automovil.component.css']
})
export class ComprarAutomovilComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params.clienteId);
      console.log(params.automovilId);
    });
  }

}
