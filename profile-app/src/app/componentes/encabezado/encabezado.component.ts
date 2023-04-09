import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})

export class EncabezadoComponent implements OnInit {
  miPersona:any;
  noLogueado:boolean;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miPersona = new Object();
    this.noLogueado = true;
  }
  
  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }

    this.datosPorfolio.obtenerDatos().subscribe(data => {
      this.miPersona = data;
    });
    console.log(this.noLogueado)
  }
}
