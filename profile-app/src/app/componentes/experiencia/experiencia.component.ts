import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit  {
  miExperienciaList:any;
  constructor(private datosPorfolio:PortfolioService) { 
    this.miExperienciaList = new Array();
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatosExperiencia().subscribe(data => {
      console.log(data);
      this.miExperienciaList = data;
    });
  }
}
