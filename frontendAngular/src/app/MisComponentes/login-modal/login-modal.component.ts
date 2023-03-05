import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';


declare var $: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {


  
//--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  email        : string = "";
  password     : string = "";
  pag_activa   : string = "";
  check: boolean = false;




//--------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//--------------------------------------------------------------------
  
  //Importaciones necesarias en el constructor
  constructor(public msj:MensajesService, private PeticionDeLlegada:PeticionService, private dir:Router) {
    this.pag_activa = "active";
  }



  ngOnInit(): void {
    $('#exampleModalCenter').modal('show');
  }


//--------------------------------------------------------------------
//MÉTODOS Y FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  //Función para validar la aceptación de los términos y condiciones
  terminos() {
    this.check = !this.check;
  }
  
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

            this.dir.navigate(["/Dashboard"]); //Enviamos al usuario a la zona privada
          }
        })  
  } //Fin de la función de iniciar sesión


  //Función para ver las Cookies
  MostrarCookies() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/MostrarCookies",
      payload: {
      }
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        console.log(respuesta);
      })

  } //Fin función: MostrarCookies()



} //FIN DE LA CLASE
