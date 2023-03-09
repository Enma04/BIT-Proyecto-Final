import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {

//--------------------------------------------------------------------------------------------------
//Declaracion de variables con un valor inicial
//--------------------------------------------------------------------------------------------------
  DatosUsuario: any[] = [];
  admin: boolean= false;
  


//--------------------------------------------------------------------------------------------------
//Constructor de la clase que recibe un servicio de peticiones
//--------------------------------------------------------------------------------------------------
  constructor(private PeticionDeLlegada: PeticionService, private dir: Router, public msj: MensajesService) { }



//--------------------------------------------------------------------------------------------------
//Inicializador de la clase que actualiza los datos al valor actual del usuario
//--------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.listarDatos();
  }



//--------------------------------------------------------------------------------------------------
//Funciones de la clase
//--------------------------------------------------------------------------------------------------
  //Funcion para listar la información del usuario
  listarDatos() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/ListarUsuario",
      payload:{}
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        console.log(respuesta);

        this.DatosUsuario = respuesta.data;
        this.Administrador();

      })
    

  }//Fin de la función listarDatos

  //Funcion para listar la información del usuario
  Administrador(){
    if(this.DatosUsuario[0].rol == 2){
      this.admin = true;
    }
    else{
      this.admin = false;
    }
    console.log("Es admin? " + this.admin);
  }

  //Función que llama la api "/Cliente/CerrarSesion" del backend para destruir la sesión activa
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
    
  } //Fin de la función CerrarSesion()

  //Funcion para cuenta de usuario
  EliminarCuenta(){
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/Eliminar",
      payload:{
        cedula: this.DatosUsuario[0].cedula,
      }
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        console.log(respuesta);

        if (respuesta.state == true) {
          this.msj.Cargar("success", respuesta.mensaje, 4000);
          this.CerrarSesion();
          this.dir.navigate(['/']); //Enviamos al usuario al Home
        }
        else {
          this.msj.Cargar("danger", respuesta.mensaje, 4000);
        }

      })
  }

} //Fin de la clase
