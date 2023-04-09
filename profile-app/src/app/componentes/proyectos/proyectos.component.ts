import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  miProyectosList:any;
  constructor(private datosPorfolio:PortfolioService) { 
    this.miProyectosList = new Array();
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatosProyectos().subscribe(data => {
      console.log(data);
      this.miProyectosList = data;
    });
  }
}
