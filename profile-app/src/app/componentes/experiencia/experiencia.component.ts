import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit  {
  miExperienciaList:Array<any>;
  miExperienciaMap:Map<number, number>;
  noLogueado:boolean;
  agregando:boolean;
  esTrabajoActual:boolean;
  urlFotoEmpresa:string;
  tipoEmpleo:string;
  empleo:any;
  nombreEmpresa:string;
  fechaInicio:string;
  fechaFin:string;
  experienciaLaboralcol:string;
  editando:Map<number, boolean>;
  borrando:Map<number, boolean>;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miExperienciaList = new Array();
    this.miExperienciaMap = new Map();
    this.noLogueado = true;
    this.agregando = false;
    this.esTrabajoActual = false;
    this.urlFotoEmpresa = '';
    this.tipoEmpleo = '';
    this.nombreEmpresa = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.experienciaLaboralcol = '';
    this.editando = new Map();
    this.borrando = new Map();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }

    this.datosPorfolio.obtenerDatosExperiencia().subscribe(data => {
      console.log(data);
      this.miExperienciaList = data;
      this.miExperienciaMap = new Map();
      this.miExperienciaList.forEach((elem, i) => {
        this.miExperienciaMap.set(elem.id, i);
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
      this.datosPorfolio.borraExperiencia(id).subscribe(data => {
        console.log(data);
        window.location.reload();
      });        
    }
    if(this.editando.get(id)) {
      this.datosPorfolio.agregarEmpleo(this.tipoEmpleoValueMap(id)).subscribe(data => {
        console.log(data);
        var index = this.miExperienciaMap.get(id);
        if (index !== undefined) {
          var exp:any = this.miExperienciaList[index];    
          exp.empleo = data;
          if (this.actualizaExperienciaValido(exp)) {
            console.log(exp.empleo.id);
            this.datosPorfolio.modificaExperiencia({
              'id':exp.id,
              'persona':{'id':1},
              'tipoEmpleo':exp.empleo,
              'nombreEmpresa':exp.nombreEmpresa,
              'experienciaLaboralcol':exp.experienciaLaboralcol,
              'esTrabajoActual':exp.esTrabajoActual,
              'fechaInicio':exp.fechaInicio,
              'fechaFin':exp.fechaFin,
              'urlFotoEmpresa':exp.urlFotoEmpresa
            }).subscribe(data => {
              console.log(data);
              window.location.reload();
            });
          }
        }
      });
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
    if (this.tipoEmpleo) {
      this.datosPorfolio.agregarEmpleo(this.tipoEmpleo).subscribe(data => {
        console.log(data);
        this.empleo = data;
        if (this.creaExperienciaValido()) {
          console.log(this.empleo.id);
          this.datosPorfolio.agregarExperiencia({
            'persona':{'id':1},
            'tipoEmpleo':this.empleo,
            'nombreEmpresa':this.nombreEmpresa,
            'experienciaLaboralcol':this.experienciaLaboralcol,
            'esTrabajoActual':this.esTrabajoActual,
            'fechaInicio':this.fechaInicio,
            'fechaFin':this.fechaFin,
            'urlFotoEmpresa':this.urlFotoEmpresa
          }).subscribe(data => {
            console.log(data);
            window.location.reload();
          });
        }
      });
    }
    this.agregando = false;
  }

  creaExperienciaValido(): boolean {
    if (!this.urlFotoEmpresa) {
      return false;
    }
    if (!this.empleo.id) {
      return false;
    }
    if (!this.nombreEmpresa) {
      return false;
    }
    if (!this.fechaInicio || (+this.fechaInicio < 0 || +this.fechaInicio > 2050)) {
      return false;
    }
    if (!this.esTrabajoActual && (!this.fechaFin || (+this.fechaFin < 0 || +this.fechaFin > 2050))) {
      return false;
    }
    if (!this.experienciaLaboralcol) {
      return false;
    }
    return true;
  }

  actualizaExperienciaValido(exp:any): boolean {
    if (!exp.urlFotoEmpresa) {
      return false;
    }
    if (!exp.empleo.id) {
      return false;
    }
    if (!exp.nombreEmpresa) {
      return false;
    }
    if (!exp.fechaInicio || (+exp.fechaInicio < 0 || +exp.fechaInicio > 2050)) {
      return false;
    }
    if (!exp.esTrabajoActual && (!exp.fechaFin || (+exp.fechaFin < 0 || +exp.fechaFin > 2050))) {
      return false;
    }
    if (!exp.experienciaLaboralcol) {
      return false;
    }
    return true;
  }

  getTrabajoActualValue(value:boolean): void {
    this.esTrabajoActual = value;
  } 
  
  getTrabajoActualValueMap(id:number, value:boolean): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].esTrabajoActual = value;
    }
  }

  esTrabajoActualMap(id:number): boolean {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      return this.miExperienciaList[index].esTrabajoActual;
    }
    return false;
  }
  
  getUrlFotoEmpresaValue(value:string): void {
    this.urlFotoEmpresa = value;
  } 
  
  getUrlFotoEmpresaValueMap(id:number, value:string): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].urlFotoEmpresa = value;
    }
  } 
  
  getTipoEmpleoValue(value:string): void {
    this.tipoEmpleo = value;
  } 
  
  getTipoEmpleoValueMap(id:number, value:string): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].tipoEmpleo.nombreTipo = value;
    }
  } 
  
  tipoEmpleoValueMap(id:number): string {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      return this.miExperienciaList[index].tipoEmpleo.nombreTipo;
    }
    return "";
  } 
  
  getNombreEmpresaValue(value:string): void {
    this.nombreEmpresa = value;
  } 
  
  getNombreEmpresaValueMap(id:number, value:string): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].nombreEmpresa = value;
    }
  } 
  
  getFechaInicioValue(value:string): void {
    this.fechaInicio = value;
  } 
  
  getFechaInicioValueMap(id:number, value:string): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].fechaInicio = value;
    }
  } 
  
  getFechaFinValue(value:string): void {
    this.fechaFin = value;
  } 
  
  getFechaFinValueMap(id:number, value:string): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].fechaFin = value;
    }
  } 
  
  getExperienciaLaboralcolValue(value:string): void {
    this.experienciaLaboralcol = value;
  } 
  
  getExperienciaLaboralcolValueMap(id:number, value:string): void {
    var index = this.miExperienciaMap.get(id);
    if (index !== undefined) {
      this.miExperienciaList[index].experienciaLaboralcol = value;
    }
  } 
}
