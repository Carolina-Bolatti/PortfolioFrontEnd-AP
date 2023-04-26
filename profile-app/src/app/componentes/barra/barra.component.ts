import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
  miPersona:any;
  noLogueado:boolean;
  editando:boolean;
  urlFoto:string;
  nombre:string;
  apellido:string;
  fechaNac:string;
  estadoCivil:string;
  nacionalidad:string;
  lenguajes:string;
  celular:string;
  telefono:string;
  correo:string;
  direccion:string;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miPersona = new Object();
    this.noLogueado = true;
    this.editando = false;
    this.urlFoto = '';
    this.nombre = '';
    this.apellido = '';
    this.fechaNac = '';
    this.estadoCivil = '';
    this.nacionalidad = '';
    this.lenguajes = '';
    this.celular = '';
    this.telefono = '';
    this.correo = '';
    this.direccion = '';
    }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }
    this.datosPorfolio.obtenerDatosPersona().subscribe(data => {
      this.miPersona = data;
      this.urlFoto = data.urlFoto;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.fechaNac = data.fechaNac;
      this.estadoCivil = data.estadoCivil;
      this.nacionalidad = data.nacionalidad;
      this.lenguajes = data.lenguajes;
      this.celular = data.celular;
      this.telefono = data.telefono;
      this.correo = data.correo;
      this.direccion = data.direccion;
    });
  }

  onEdit(): void {
    this.editando = true;
  }

  onCancel(): void {
    this.editando = false;
  }

  onSave(): void {
    this.miPersona.urlFoto = this.urlFoto;
    this.miPersona.nombre = this.nombre;
    this.miPersona.apellido = this.apellido;
    this.miPersona.fechaNac = this.fechaNac;
    this.miPersona.estadoCivil = this.estadoCivil;
    this.miPersona.nacionalidad = this.nacionalidad;
    this.miPersona.lenguajes = this.lenguajes;
    this.miPersona.celular = this.celular;
    this.miPersona.telefono = this.telefono;
    this.miPersona.correo = this.correo;
    this.miPersona.direccion = this.direccion;
    this.datosPorfolio.modificaPersona(this.miPersona).subscribe(data => {
      console.log(data);
    });
    this.editando = false;
  }

  getUrlFotoValue(value:string): void {
    this.urlFoto = value;
  }
  getNombreValue(value:string): void {
    this.nombre = value;
  }
  getApellidoValue(value:string): void {
    this.apellido = value;
  }
  getFechaNacValue(value:string): void {
    this.fechaNac = value;
  }
  getEstadoCivilValue(value:string): void {
    this.estadoCivil = value;
  }
  getNacionalidadValue(value:string): void {
    this.nacionalidad = value;
  }
  getLenguajesValue(value:string): void {
    this.lenguajes = value;
  }
  getCelularValue(value:string): void {
    this.celular = value;
  }
  getTelefonoValue(value:string): void {
    this.telefono = value;
  }
  getCorreoValue(value:string): void {
    this.correo = value;
  }
  getDireccionValue(value:string): void {
    this.direccion = value;
  }
}
