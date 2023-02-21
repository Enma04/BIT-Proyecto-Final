import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }
  
  //creamos un array de datos público, de la clase MensajesServices
  public datos: any[] = [];
  //public miMsj: string = "Mi mensaje";


  /**
 * Esta función borra los mensajes que se crean en pantalla
 */
  private BorrarMsj(tiempo:number) {

    setTimeout(() => {
      this.datos.splice(0, 1);
    }, tiempo);

  }


  //Creamos una funcionalidad pública que recibe el tipo de mensaje y el mensaje
  //hacemos una documentación de la función con "/" seguido de "**" y enter

/**
 * Funcion para cargar un mensaje en pantalla
 * @param Escribetipo //puede ser de tipo: success, primary, danger
 * @param EscribeMensaje //Escribir mensaje
 * @param tiempo //Es el tiempo de duración del mensaje en pantalla
 */
  public Cargar(Escribetipo: string, EscribeMensaje: string, tiempo:number) {
    this.datos.push({ tipo:Escribetipo, mensaje:EscribeMensaje });
    this.BorrarMsj(tiempo);
  }

}
