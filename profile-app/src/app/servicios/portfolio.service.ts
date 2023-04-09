import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any> {
    console.log("El servicio Portfolio está corriendo");
    //return '{}';
    return this.http.get('http://localhost:8080/ver/persona/1');
  }

  obtenerDatosExperiencia():Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.get('http://localhost:8080/ver/experiencia/de/1');
  }

  obtenerDatosEducacion():Observable<any> {
    console.log("El servicio Portfolio edu está corriendo");
    return this.http.get('http://localhost:8080/ver/educacion/de/1');
  }

  obtenerDatosSkills():Observable<any> {
    console.log("El servicio Portfolio skills está corriendo");
    return this.http.get('http://localhost:8080/ver/skills/de/1');
  }

  obtenerDatosProyectos():Observable<any> {
    console.log("El servicio Portfolio skills está corriendo");
    return this.http.get('http://localhost:8080/ver/proyectos/de/1');
  }
}
