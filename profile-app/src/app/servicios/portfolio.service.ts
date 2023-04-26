import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatosPersona():Observable<any> {
    console.log("El servicio Portfolio está corriendo");
    //return '{}';
    return this.http.get('http://localhost:8080/ver/persona/1');
  }

  modificaPersona(persona:any)
  {
    console.log(persona);
    var response = this.http.put('http://localhost:8080/update/persona', persona, {
      headers: {'content-type':'application/json'}
   });
    console.log(response);
    return response;
  }

  obtenerDatosEmpleo():Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.get('http://localhost:8080/ver/empleo');
  }

  agregarEmpleo(empleo:string):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.post('http://localhost:8080/new/empleo/' + empleo, '');
  }

  obtenerDatosExperiencia():Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.get('http://localhost:8080/ver/experiencia/de/1');
  }

  agregarExperiencia(experiencia:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(experiencia);
    return this.http.post('http://localhost:8080/new/experiencia', experiencia);
  }

  modificaExperiencia(experiencia:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(experiencia);
    return this.http.put('http://localhost:8080/update/experiencia', experiencia);
  }

  borraExperiencia(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('http://localhost:8080/delete/experiencia/' + id);
  }

  obtenerDatosEducacion():Observable<any> {
    console.log("El servicio Portfolio edu está corriendo");
    return this.http.get('http://localhost:8080/ver/educacion/de/1');
  }

  agregarEducacion(educacion:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(educacion);
    return this.http.post('http://localhost:8080/new/educacion', educacion);
  }

  modificaEducacion(educacion:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(educacion);
    return this.http.put('http://localhost:8080/update/educacion', educacion);
  }

  borraEducacion(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('http://localhost:8080/delete/educacion/' + id);
  }

  obtenerDatosSkills():Observable<any> {
    console.log("El servicio Portfolio skills está corriendo");
    return this.http.get('http://localhost:8080/ver/skills/de/1');
  }

  agregarSkills(skill:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(skill);
    return this.http.post('http://localhost:8080/new/skills', skill);
  }

  modificaSkills(skill:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(skill);
    return this.http.put('http://localhost:8080/update/skills', skill);
  }

  borraSkills(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('http://localhost:8080/delete/skills/' + id);
  }

  obtenerDatosProyectos():Observable<any> {
    console.log("El servicio Portfolio skills está corriendo");
    return this.http.get('http://localhost:8080/ver/proyectos/de/1');
  }

  agregarProyectos(proyecto:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(proyecto);
    return this.http.post('http://localhost:8080/new/proyectos', proyecto);
  }

  modificaProyectos(proyecto:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(proyecto);
    return this.http.put('http://localhost:8080/update/proyectos', proyecto);
  }

  borraProyectos(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('http://localhost:8080/delete/proyectos/' + id);
  }
}
