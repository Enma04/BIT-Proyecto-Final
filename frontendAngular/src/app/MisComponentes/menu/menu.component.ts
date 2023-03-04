import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';


declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  //--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  email        : string = "";
  password     : string = "";
  pag_activa   : string = "";





//--------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//--------------------------------------------------------------------
  
  //Importaciones necesarias en el constructor
  constructor(public msj:MensajesService, private PeticionDeLlegada:PeticionService, private dir:Router) { }



//--------------------------------------------------------------------
//MÉTODOS Y FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  
  //Función que me lleva a la zona privada
  iniciarSesion() {

    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/LoginUsuario",
      payload: {
        email       : this.email,
        password    : this.password,
      }
    }

      //Petición de tipo Post
      this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
        (respuesta: any) => {

          console.log(respuesta);

          if (respuesta.state == false) {
            //Cargamos el mensaje de peligro, si falta un campo
            this.msj.Cargar("danger", respuesta.mensaje, 4000);
          }
          else {
            //Cargamos el mensaje exitoso
            this.msj.Cargar("success", respuesta.mensaje, 4000);

            //Lo último que se hace (limpiar datos)
            this.email = "";
            this.password = "";
            $('#exampleModalCenter').modal('hide');
          }
        })  
  } //Fin de la función de iniciar sesión



  //Función qque caga la ventana modal
  CargarModal() {
    $('#exampleModalCenter').modal('show');
  }

}
