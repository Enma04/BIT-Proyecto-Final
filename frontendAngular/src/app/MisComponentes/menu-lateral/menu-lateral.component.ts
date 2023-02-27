import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
  
  
  
  
//-------------------------------------------------------------------------------
//CLASE: MenuLateralComponent
//-------------------------------------------------------------------------------
export class MenuLateralComponent {


//-------------------------------------------------------------------------------
//VARIABLES DE LA CLASE
//-------------------------------------------------------------------------------
  datosMenu = [
    { nombre: 'Datos Usuario', destino: '/Usuario' },
    { nombre: 'Dashboard', destino: '/Dashboard' },
    {nombre:'Productos',destino:'/Productos'},
  ]



//-------------------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//-------------------------------------------------------------------------------
  
  constructor(private dir:Router, private PeticionDeLlegada:PeticionService, public msj:MensajesService ) {
    
  }
  


//-------------------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//-------------------------------------------------------------------------------

  CerrarSesion() {

    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/CerrarSesion",
      payload: {
      }
    }

      //Petición de tipo Post
      this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
        (respuesta: any) => {

          if (respuesta.state == true) {
            this.msj.Cargar("primary", respuesta.mensaje, 4000);
            this.dir.navigate(['/']); //Enviamos al usuario al Home
          }
          else {
            this.msj.Cargar("danger", "Fallo el cierre de sesión :(", 4000);
          }
          console.log(respuesta);
          
        })
  }

}
