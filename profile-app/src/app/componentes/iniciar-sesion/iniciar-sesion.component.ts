import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, private autenticationService:AutenticacionService, private ruta:Router) { 
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required,Validators.minLength(7)]]
      }
    )
  }

  ngOnInit(): void {
  }

  get Username()
  {
    return this.form.get('username');
  }

  get Password()
  {
    return this.form.get('password');
  }

  onEnviar(event:Event)
  {
    event.preventDefault;
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/portfolio']);
    })
  }
}
