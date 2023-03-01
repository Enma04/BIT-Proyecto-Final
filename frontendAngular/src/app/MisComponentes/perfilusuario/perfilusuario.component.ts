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

      })
    

  }//Fin de la función listarDatos

} //Fin de la clase
