import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  miProyectosList:Array<any>;
  miProyectosMap:Map<number, number>;
  noLogueado:boolean;
  agregando:boolean;
  nombre:string;
  urlLogo:string;
  descripcion:string;
  editando:Map<number, boolean>;
  borrando:Map<number, boolean>;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miProyectosList = new Array();
    this.miProyectosMap = new Map();
    this.noLogueado = true;
    this.agregando = false;
    this.nombre = '';
    this.urlLogo = '';
    this.descripcion = '';
    this.editando = new Map();
    this.borrando = new Map();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }

    this.datosPorfolio.obtenerDatosProyectos().subscribe(data => {
      console.log(data);
      this.miProyectosList = data;
      this.miProyectosMap = new Map();
      this.miProyectosList.forEach((elem, i) => {
        this.miProyectosMap.set(elem.id, i);
        this.editando.set(elem.id, false);
        this.borrando.set(elem.id, false);
      });
    });
  }

  onEdit(id:number): void {
    this.editando.set(id, true);
  }

  onDelete(id:number): void {
    this.borrando.set(id, true);
  }

  onCancel(id:number): void {
    this.editando.set(id, false);
    this.borrando.set(id, false);
  }

  onSave(id:number): void {
    if(this.borrando.get(id)) {
      this.datosPorfolio.borraProyectos(id).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }
    if(this.editando.get(id)) {
      var index = this.miProyectosMap.get(id);
      if (index !== undefined) {
        var proy:any = this.miProyectosList[index];    
        if (this.actualizaProyectosValido(proy)) {
          this.datosPorfolio.modificaProyectos({
            'id':proy.id,
            'persona':{'id':1},
            'nombre':proy.nombre,
            'descripcion':proy.descripcion,
            'urlLogo':proy.urlLogo
          }).subscribe(data => {
            console.log(data);
            window.location.reload();
          });
        }
      }
    }
    this.editando.set(id, false);
    this.borrando.set(id, false);
  }

  onAdd(): void {
    this.agregando = true;
  }
  
  onCancelAdd(): void {
    this.agregando = false;
  }
  
  onNew(): void {
    if (this.creaProyectosValido()) {
      this.datosPorfolio.agregarProyectos({
        'persona':{'id':1},
        'nombre':this.nombre,
        'descripcion':this.descripcion,
        'urlLogo':this.urlLogo
      }).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }
    this.agregando = false;
  }

  creaProyectosValido(): boolean {
    if (!this.urlLogo) {
      return false;
    }
    if (!this.nombre) {
      return false;
    }
    if (!this.descripcion) {
      return false;
    }
    return true;
  }

  actualizaProyectosValido(edu:any): boolean {
    if (!edu.urlLogo) {
      return false;
    }
    if (!edu.nombre) {
      return false;
    }
    if (!edu.descripcion) {
      return false;
    }
    return true;
  }
  
  getUrlLogoValue(value:string): void {
    this.urlLogo = value;
  } 
  
  getUrlLogoValueMap(id:number, value:string): void {
    var index = this.miProyectosMap.get(id);
    if (index !== undefined) {
      this.miProyectosList[index].urlLogo = value;
    }
  } 
  
  getNombreValue(value:string): void {
    this.nombre = value;
  } 
  
  getNombreValueMap(id:number, value:string): void {
    var index = this.miProyectosMap.get(id);
    if (index !== undefined) {
      this.miProyectosList[index].nombre = value;
    }
  } 
  
  getDescripcionValue(value:string): void {
    this.descripcion = value;
  }

  getDescripcionValueMap(id:number, value:string): void {
    var index = this.miProyectosMap.get(id);
    if (index !== undefined) {
      this.miProyectosList[index].descripcion = value;
    }
  }

}
