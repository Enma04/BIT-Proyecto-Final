import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {



  //--------------------------------------------------------------------------------------------------
  //Declaracion de variables con un valor inicial
  //--------------------------------------------------------------------------------------------------
  DatosUsuario: any[] = [];

  cedula: string = "";
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  edad!: number;      //Se establece como propiedad definitiva
  direccion: string = "";
  telefono: string = "";
  estadocivil: string = "";
  password: string = "";
  password_check: string = "";


  //--------------------------------------------------------------------------------------------------
  //Constructor de la clase que recibe un servicio de peticiones
  //--------------------------------------------------------------------------------------------------
  constructor(private PeticionDeLlegada: PeticionService, private dir: Router) { }



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

        this.nombre = respuesta.data[0].nombre;
        this.apellido = respuesta.data[0].apellido;
        this.cedula = respuesta.data[0].cedula;
        this.telefono = respuesta.data[0].telefono;
        this.direccion = respuesta.data[0].direccion;
        this.edad = respuesta.data[0].edad;
        //console.log(this.DatosUsuario);

      })
    
    

  }//Fin de la función listarDatos

  

}
