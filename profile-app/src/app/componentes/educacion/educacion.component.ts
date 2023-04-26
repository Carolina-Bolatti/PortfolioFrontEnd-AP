import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miEducacionList:Array<any>;
  miEducacionMap:Map<number, number>;
  noLogueado:boolean;
  agregando:boolean;
  estaCursando:boolean;
  urlFoto:string;
  tituloAlcanzado:string;
  lugar:string;
  fechaInicio:string;
  fechaFin:string;
  descripcion:string;
  editando:Map<number, boolean>;
  borrando:Map<number, boolean>;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miEducacionList = new Array();
    this.miEducacionMap = new Map();
    this.noLogueado = true;
    this.agregando = false;
    this.estaCursando = false;
    this.urlFoto = '';
    this.tituloAlcanzado = '';
    this.lugar = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.descripcion = '';
    this.editando = new Map();
    this.borrando = new Map();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }

    this.datosPorfolio.obtenerDatosEducacion().subscribe(data => {
      console.log(data);
      this.miEducacionList = data;
      this.miEducacionMap = new Map();
      this.miEducacionList.forEach((elem, i) => {
        this.miEducacionMap.set(elem.id, i);
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
      this.datosPorfolio.borraEducacion(id).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }
    if(this.editando.get(id)) {
      var index = this.miEducacionMap.get(id);
      if (index !== undefined) {
        var edu:any = this.miEducacionList[index];    
        if (this.actualizaEducacionValido(edu)) {
          this.datosPorfolio.modificaEducacion({
            'id':edu.id,
            'persona':{'id':1},
            'tituloAlcanzado':edu.tituloAlcanzado,
            'lugar':edu.lugar,
            'descripcion':edu.descripcion,
            'estaCursando':edu.estaCursando,
            'fechaInicio':edu.fechaInicio,
            'fechaFin':edu.fechaFin,
            'urlFoto':edu.urlFoto
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
    if (this.creaEducacionValido()) {
      this.datosPorfolio.agregarEducacion({
        'persona':{'id':1},
        'tituloAlcanzado':this.tituloAlcanzado,
        'lugar':this.lugar,
        'descripcion':this.descripcion,
        'estaCursando':this.estaCursando,
        'fechaInicio':this.fechaInicio,
        'fechaFin':this.fechaFin,
        'urlFoto':this.urlFoto
      }).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }
    this.agregando = false;
  }

  creaEducacionValido(): boolean {
    if (!this.urlFoto) {
      return false;
    }
    if (!this.tituloAlcanzado) {
      return false;
    }
    if (!this.lugar) {
      return false;
    }
    if (!this.fechaInicio || (+this.fechaInicio < 0 || +this.fechaInicio > 2050)) {
      return false;
    }
    if (!this.estaCursando && (!this.fechaFin || (+this.fechaFin < 0 || +this.fechaFin > 2050))) {
      return false;
    }
    if (!this.descripcion) {
      return false;
    }
    return true;
  }

  actualizaEducacionValido(edu:any): boolean {
    if (!edu.urlFoto) {
      return false;
    }
    if (!edu.tituloAlcanzado) {
      return false;
    }
    if (!edu.lugar) {
      return false;
    }
    if (!edu.fechaInicio || (+edu.fechaInicio < 0 || +edu.fechaInicio > 2050)) {
      return false;
    }
    if (!edu.estaCursando && (!edu.fechaFin || (+edu.fechaFin < 0 || +edu.fechaFin > 2050))) {
      return false;
    }
    if (!edu.descripcion) {
      return false;
    }
    return true;
  }

  getEstaCursandoValue(value:boolean): void {
    this.estaCursando = value;
  } 
  
  getEstaCursandoValueMap(id:number, value:boolean): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].estaCursando = value;
    }
  }

  estaCursandoMap(id:number): boolean {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      return this.miEducacionList[index].estaCursando;
    }
    return false;
  }
  
  getUrlFotoValue(value:string): void {
    this.urlFoto = value;
  } 
  
  getUrlFotoValueMap(id:number, value:string): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].urlFoto = value;
    }
  } 
  
  getTituloAlcanzadoValue(value:string): void {
    this.tituloAlcanzado = value;
  } 
  
  getTituloAlcanzadoValueMap(id:number, value:string): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].tituloAlcanzado = value;
    }
  } 
  
  getLugarValue(value:string): void {
    this.lugar = value;
  } 

  getLugarValueMap(id:number, value:string): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].lugar = value;
    }
  } 

  getFechaInicioValue(value:string): void {
    this.fechaInicio = value;
  } 
  
  getFechaInicioValueMap(id:number, value:string): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].fechaInicio = value;
    }
  } 
  
  getFechaFinValue(value:string): void {
    this.fechaFin = value;
  } 
  
  getFechaFinValueMap(id:number, value:string): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].fechaFin = value;
    }
  } 
  
  getDescripcionValue(value:string): void {
    this.descripcion = value;
  } 
  
  getDescripcionValueMap(id:number, value:string): void {
    var index = this.miEducacionMap.get(id);
    if (index !== undefined) {
      this.miEducacionList[index].descripcion = value;
    }
  } 
}
