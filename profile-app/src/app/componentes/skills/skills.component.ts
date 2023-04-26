import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miSkillsHardList:Array<any>;
  miSkillsSoftList:Array<any>;
  miSkillsList:Array<any>;
  miSkillsMap:Map<number, number>;
  noLogueado:boolean;
  agregando:boolean;
  tipo:string;
  urlPorcentaje:string;
  nombreSkill:string;
  editando:Map<number, boolean>;
  borrando:Map<number, boolean>;

  constructor(private datosPorfolio:PortfolioService) { 
    this.miSkillsHardList = new Array();
    this.miSkillsSoftList = new Array();
    this.miSkillsList = new Array();
    this.miSkillsMap = new Map();
    this.noLogueado = true;
    this.agregando = false;
    this.tipo = '';
    this.urlPorcentaje = '';
    this.nombreSkill = '';
    this.editando = new Map();
    this.borrando = new Map();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.noLogueado = false;
    }

    this.datosPorfolio.obtenerDatosSkills().subscribe(data => {
      console.log(data);
      this.miSkillsList = data;
      this.miSkillsHardList = data.filter((e: { tipo: string; }) => e.tipo === 'HARD');
      this.miSkillsSoftList = data.filter((e: { tipo: string; }) => e.tipo === 'SOFT');
      this.miSkillsMap = new Map();
      this.miSkillsList.forEach((elem, i) => {
        this.miSkillsMap.set(elem.id, i);
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
      this.datosPorfolio.borraSkills(id).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }
    if(this.editando.get(id)) {
      var index = this.miSkillsMap.get(id);
      if (index !== undefined) {
        var skl:any = this.miSkillsList[index];    
        if (this.actualizaSkillsValido(skl)) {
          this.datosPorfolio.modificaSkills({
            'id':skl.id,
            'persona':{'id':1},
            'tipo':skl.tipo,
            'nombreSkill':skl.nombreSkill,
            'urlPorcentaje':skl.urlPorcentaje
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
    if (this.creaSkillsValido()) {
      this.datosPorfolio.agregarSkills({
        'persona':{'id':1},
        'tipo':this.tipo,
        'nombreSkill':this.nombreSkill,
        'urlPorcentaje':this.urlPorcentaje
      }).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }
    this.agregando = false;
  }

  creaSkillsValido(): boolean {
    if (!this.urlPorcentaje) {
      return false;
    }
    if (this.tipo !== 'HARD' && this.tipo !== 'SOFT') {
      return false;
    }
    if (!this.nombreSkill) {
      return false;
    }
    return true;
  }

  actualizaSkillsValido(edu:any): boolean {
    if (!edu.urlPorcentaje) {
      return false;
    }
    if (edu.tipo !== 'HARD' && edu.tipo !== 'SOFT') {
      return false;
    }
    if (!edu.nombreSkill) {
      return false;
    }
    return true;
  }
  
  getUrlPorcentajeValue(value:string): void {
    this.urlPorcentaje = value;
  } 
  
  getUrlPorcentajeValueMap(id:number, value:string): void {
    var index = this.miSkillsMap.get(id);
    if (index !== undefined) {
      this.miSkillsList[index].urlPorcentaje = value;
    }
  } 
  
  getTipoValue(value:string): void {
    this.tipo = value;
  } 
  
  getTipoValueMap(id:number, value:string): void {
    var index = this.miSkillsMap.get(id);
    if (index !== undefined) {
      this.miSkillsList[index].tipo = value;
    }
  } 
  
  getNombreSkillValue(value:string): void {
    this.nombreSkill = value;
  }

  getNombreSkillValueMap(id:number, value:string): void {
    var index = this.miSkillsMap.get(id);
    if (index !== undefined) {
      this.miSkillsList[index].nombreSkill = value;
    }
  }

}
