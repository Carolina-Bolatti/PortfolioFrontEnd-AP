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
  editando:boolean;
  urlLinkedin:string;
  urlIg:string;
  urlGithub:string;
  urlBanner:string;
  

  constructor(private datosPorfolio:PortfolioService) { 
    this.miPersona = new Object();
    this.noLogueado = true;
    this.editando = false;
    this.urlLinkedin = '';
    this.urlIg = '';
    this.urlGithub = '';
    this.urlBanner = '';
  }
  
  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }

    this.datosPorfolio.obtenerDatosPersona().subscribe(data => {
      this.miPersona = data;
      this.urlLinkedin = data.urlLinkedin;
      this.urlIg = data.urlIg;
      this.urlGithub = data.urlGithub;
      this.urlBanner = data.urlBanner;
       });
    console.log(this.noLogueado)
  }

  onEdit(): void {
    this.editando = true;
  }

  onCancel(): void {
    this.editando = false;
  }

  onSave(): void {
    this.miPersona.urlLinkedin = this.urlLinkedin;
    this.miPersona.urlIg = this.urlIg;
    this.miPersona.urlGithub = this.urlGithub;
    this.miPersona.urlBanner = this.urlBanner;
    this.datosPorfolio.modificaPersona(this.miPersona).subscribe(data => {
      console.log(data);
    });
    this.editando = false;
  }

  getUrlLinkedinValue(value:string): void {
    this.urlLinkedin = value;
  } 

  getUrlIgValue(value:string): void {
    this.urlIg = value;
  } 

  getUrlGithubValue(value:string): void {
    this.urlGithub = value;
  } 

  getUrlBannerValue(value:string): void {
    this.urlBanner = value;
  } 
}
