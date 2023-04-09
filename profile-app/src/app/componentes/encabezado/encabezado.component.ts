import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})

export class EncabezadoComponent implements OnInit {
  miPersona:any;
  constructor(private datosPorfolio:PortfolioService) { 
    this.miPersona = new Object();
  }
  
  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data => {
      this.miPersona = data;
    });
  }
}
