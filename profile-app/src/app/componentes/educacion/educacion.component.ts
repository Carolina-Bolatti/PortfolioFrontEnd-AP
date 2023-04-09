import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miEducacionList:any;
  constructor(private datosPorfolio:PortfolioService) { 
    this.miEducacionList = new Array();
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatosEducacion().subscribe(data => {
      console.log(data);
      this.miEducacionList = data;
    });
  }
}
