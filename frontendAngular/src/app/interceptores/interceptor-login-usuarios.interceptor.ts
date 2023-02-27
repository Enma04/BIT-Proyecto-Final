import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorLoginUsuariosInterceptor implements HttpInterceptor {

  peticionOption: any = {};

  constructor() {}

  intercept(peticion: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //Peticiones tipo GET
    if (peticion.method == "GET") {
      this.peticionOption = {
        headers: new HttpHeaders (
          { "Content-Type": "application/json;charset=UTF-8" }
        ),
        withCredentials: false,
      }
    }
    //Peticiones tipo POST
    else if (peticion.method == "POST") {
      console.log("interceptando peticiones");
      this.peticionOption = {
        headers: new HttpHeaders (
          { "Content-Type": "application/json;charset=UTF-8" }
        ),
        withCredentials: true,
      }
    }

    const peticionClon = peticion.clone(this.peticionOption);

    return next.handle(peticionClon);
    
  } //Fin de la intercepción
} //Fin de la clase
