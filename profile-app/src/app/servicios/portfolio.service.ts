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
    return this.http.get('https://portfolio-backend-ap-service.onrender.com/ver/persona/1');
  }

  modificaPersona(persona:any)
  {
    console.log(persona);
    var response = this.http.put('https://portfolio-backend-ap-service.onrender.com/update/persona', persona, {
      headers: {'content-type':'application/json'}
   });
    console.log(response);
    return response;
  }

  obtenerDatosEmpleo():Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.get('https://portfolio-backend-ap-service.onrender.com/ver/empleo');
  }

  agregarEmpleo(empleo:string):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.post('https://portfolio-backend-ap-service.onrender.com/new/empleo/' + empleo, '');
  }

  obtenerDatosExperiencia():Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.get('https://portfolio-backend-ap-service.onrender.com/ver/experiencia/de/1');
  }

  agregarExperiencia(experiencia:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(experiencia);
    return this.http.post('https://portfolio-backend-ap-service.onrender.com/new/experiencia', experiencia);
  }

  modificaExperiencia(experiencia:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(experiencia);
    return this.http.put('https://portfolio-backend-ap-service.onrender.com/update/experiencia', experiencia);
  }

  borraExperiencia(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('https://portfolio-backend-ap-service.onrender.com/delete/experiencia/' + id);
  }

  obtenerDatosEducacion():Observable<any> {
    console.log("El servicio Portfolio edu está corriendo");
    return this.http.get('https://portfolio-backend-ap-service.onrender.com/ver/educacion/de/1');
  }

  agregarEducacion(educacion:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(educacion);
    return this.http.post('https://portfolio-backend-ap-service.onrender.com/new/educacion', educacion);
  }

  modificaEducacion(educacion:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(educacion);
    return this.http.put('https://portfolio-backend-ap-service.onrender.com/update/educacion', educacion);
  }

  borraEducacion(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('https://portfolio-backend-ap-service.onrender.com/delete/educacion/' + id);
  }

  obtenerDatosSkills():Observable<any> {
    console.log("El servicio Portfolio skills está corriendo");
    return this.http.get('https://portfolio-backend-ap-service.onrender.com/ver/skills/de/1');
  }

  agregarSkills(skill:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(skill);
    return this.http.post('https://portfolio-backend-ap-service.onrender.com/new/skills', skill);
  }

  modificaSkills(skill:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(skill);
    return this.http.put('https://portfolio-backend-ap-service.onrender.com/update/skills', skill);
  }

  borraSkills(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('https://portfolio-backend-ap-service.onrender.com/delete/skills/' + id);
  }

  obtenerDatosProyectos():Observable<any> {
    console.log("El servicio Portfolio skills está corriendo");
    return this.http.get('https://portfolio-backend-ap-service.onrender.com/ver/proyectos/de/1');
  }

  agregarProyectos(proyecto:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(proyecto);
    return this.http.post('https://portfolio-backend-ap-service.onrender.com/new/proyectos', proyecto);
  }

  modificaProyectos(proyecto:any):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    console.log(proyecto);
    return this.http.put('https://portfolio-backend-ap-service.onrender.com/update/proyectos', proyecto);
  }

  borraProyectos(id:number):Observable<any> {
    console.log("El servicio Portfolio exper está corriendo");
    return this.http.delete('https://portfolio-backend-ap-service.onrender.com/delete/proyectos/' + id);
  }
}
