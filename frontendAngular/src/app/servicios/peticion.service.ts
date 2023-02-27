import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from './mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient, private dir: Router, private msj:MensajesService ) { }

  public url_local: string = "http://localhost:3000";


  //Petición tipo post
  public Post(url: string, data: {}) {
    
    //Se crea una nueva variable interna de tipo new Promise()
    let prom = new Promise((resuelve, rechaza) => {

      this.http.post(url, data)  //petición de tipo post
        
        //Ejecuta una promesa (funcion que ejecuta unapeticion
        //hacia el servidor, y no se vuelve a ejecutar hasta que haya
        //una respuesta)
        .toPromise()
        
        //Cuando llega la información entónces hace algo
        .then(
          (respuesta: any) => {
            if (respuesta.redireccion == true) {
              console.log(respuesta);
              this.dir.navigate(["/Login"]);
              this.msj.Cargar("danger", respuesta.mensaje, 4000);
            }
            resuelve(respuesta);
        }
      )
    
    });

    return prom;
    
  } //Fin petición post

  //Petición tipo get
  public Get(url: string, data: {}) {
    
    //Se crea una nueva variable interna de tipo new Promise()
    let prom = new Promise((resuelve, rechaza) => {

      //this.http.get(url)  //peticion de tipo get
      this.http.get(url)  //petición de tipo post
        
        //Ejecuta una promesa (funcion que ejecuta unapeticion
        //hacia el servidor, y no se vuelve a ejecutar hasta que haya
        //una respuesta)
        .toPromise()
        
        //Cuando llega la información entónces hace algo
        .then(
          (respuesta: any) => {
            if (respuesta.redireccion == true) {
              this.dir.navigate(["/Login"]);
            }
            resuelve(respuesta);
        }
      )
    
    });

    return prom;
    
  } //Fin petición get


} //Fin de la clase PeticionService
