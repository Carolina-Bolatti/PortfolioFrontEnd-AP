import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPersona:any;
  noLogueado:boolean;
  editando:boolean;
  sobreMi:string;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miPersona = new Object();
    this.noLogueado = true;
    this.editando = false;
    this.sobreMi = '';
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }
    this.datosPorfolio.obtenerDatosPersona().subscribe(data => {
      console.log(data)
      this.miPersona = data;
      this.sobreMi = data.sobreMi;
    });
  }

  onEdit(): void {
    this.editando = true;
  }

  onCancel(): void {
    this.editando = false;
  }

  onSave(): void {
    this.miPersona.sobreMi = this.sobreMi;
    this.datosPorfolio.modificaPersona(this.miPersona).subscribe(data => {
      console.log(data);
    });
    this.editando = false;
  }

  getSobreMiValue(value:string): void {
    this.sobreMi = value;
  }
}
