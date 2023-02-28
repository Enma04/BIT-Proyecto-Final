import { Component, OnInit } from '@angular/core';
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
export class MenuLateralComponent implements OnInit {


//-------------------------------------------------------------------------------
//VARIABLES DE LA CLASE
//-------------------------------------------------------------------------------
  datosMenu: any[] = [];
  pagActiva = {
    datosusuario: "",
    dasboard: "",
    productos: "",
  };


//-------------------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//-------------------------------------------------------------------------------
  
  constructor(private dir:Router, private PeticionDeLlegada:PeticionService, public msj:MensajesService ) {
    
  }
  

//-------------------------------------------------------------------------------
//CINICIALIZADOR DE LA CLASE
//-------------------------------------------------------------------------------
  
  ngOnInit(): void {
    this.CargarMenu();
  }

  
//-------------------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//-------------------------------------------------------------------------------

  //Función que llama la api "" del backend para cargar el menú privado, dependiendo del rol
  CargarMenu() {
    
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/MenuDefinido",
      payload: {
      }
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        this.datosMenu = respuesta.datos;
      })


  } //Fin de la función CargarMenu()
  
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

}
