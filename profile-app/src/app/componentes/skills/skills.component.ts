import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miSkillsHardList:any;
  miSkillsSoftList:any;
  constructor(private datosPorfolio:PortfolioService) { 
    this.miSkillsHardList = new Array();
    this.miSkillsSoftList = new Array();
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatosSkills().subscribe(data => {
      console.log(data);
      this.miSkillsHardList = data.filter((e: { tipo: string; }) => e.tipo === 'HARD');
      this.miSkillsSoftList = data.filter((e: { tipo: string; }) => e.tipo === 'SOFT');
    });
  }
}
